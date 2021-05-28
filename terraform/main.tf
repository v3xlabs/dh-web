terraform {
  backend "remote" {
    organization = "dogehouse"

    workspaces {
      name = "web"
    }
  }
}

provider "kubernetes" {
  config_path = "~/.kube/config"
}

variable "container" {}
variable "deployurl" {}

resource "kubernetes_deployment" "web" {
    metadata {
        name = "web"
        namespace = "dogehouse"
        labels = {
            app = "web"
        }
    }

    spec {
        replicas = 3
        
        selector {
            match_labels = {
                app = "web"
            }
        }

        template {
            metadata {
                name = "web"
                namespace = "dogehouse"
                labels = {
                    app = "web"
                }
            }

            spec {
                container {
                    image = var.container
                    name = "web"

                    port {
                        container_port = 3000
                    }

                    liveness_probe {
                        http_get {
                            path = "/"
                            port = 3000
                        }

                        initial_delay_seconds = 3
                        period_seconds        = 3
                    }
                }
                
                image_pull_secrets {
                    name = "regcred"
                }
            }
        }
    }
}

resource "kubernetes_service" "web" {
    metadata {
        name = "web"
        namespace = "dogehouse"
    }

    spec {
        selector = {
            app = kubernetes_deployment.web.metadata.0.labels.app
        }
        port {
            port = 3000
            target_port = 3000
        }
        type = "ClusterIP"
    }
}

resource "kubernetes_ingress" "web" {
    metadata {
        name = "web"
        namespace = "dogehouse"
        annotations = {
            "traefik.ingress.kubernetes.io/router.tls" = "true"
            "traefik.ingress.kubernetes.io/router.tls.certresolver" = "letsencrypt"
            "traefik.ingress.kubernetes.io/priority" = "4"
        }
    }

    spec {
        rule {
            host = var.deployurl
            http {
                path {
                    path = "/"
                    backend {
                        service_name = kubernetes_service.web.metadata.0.name
                        service_port = 3000
                    }
                }
            }
        }
    }
}
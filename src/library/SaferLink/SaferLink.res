@genType
type target =
  | External
  | Internal

@genType @react.component
let make = (~href: string, ~target: target, ~children) => {
  let targetStr = switch target {
    | External => "__blank"
    | Internal => ""
  }
  <a rel="noreferrer noopener" target=targetStr href> children </a>
}

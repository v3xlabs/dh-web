@genType
type target =
  | External
  | Internal

@genType @react.component
let make = (~href: string, ~target: target, ~className: string="", ~children) => {
  let targetStr = switch target {
  | External => "__blank"
  | Internal => ""
  }

  <a rel="noreferrer noopener" className target=targetStr href> children </a>
}

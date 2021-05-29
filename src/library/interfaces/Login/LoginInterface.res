open Constant

@genType @react.component
let make = () => {
  <div>
    <h1> {React.string("Login Page")} </h1>
    <ul>
      <li>
        <SaferLink target=Internal href=Constant.discord_login_uri>
          {React.string("Login with Discord")}
        </SaferLink>
      </li>
      <li>
        <SaferLink target=Internal href=Constant.google_login_uri>
          {React.string("Login with Google")}
        </SaferLink>
      </li>
      <li>
        <SaferLink target=Internal href=Constant.github_login_uri>
          {React.string("Login with Github")}
        </SaferLink>
      </li>
    </ul>
  </div>
}

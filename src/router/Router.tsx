import { VFC, memo } from "react";
import { Switch, Route } from "react-router-dom";

import { Login } from "../components/pages/Login";
import { HomeRoutes } from "./HomeRoutes";
import { Page404 } from "../components/pages/Page404";

export const Router: VFC = memo(() => {
  return (
    <Switch>
      {/* ログインページルーティング */}
      <Route exact path="/">
        <Login />
      </Route>

      {/* /home以下のページルーティング */}
      <Route path="/home" render={({ match: { url } }) => (
        <Switch>
          {HomeRoutes.map((route) => (
            <Route key={route.path} exact={route.exact} path={`${url}${route.path}`}>
              {route.children}
            </Route>
          ))}
        </Switch>
      )} />

      {/* 404NotFoundPageルーティング */}
      <Route path="*">
        <Page404 />
      </Route>
    </Switch>
  )
});
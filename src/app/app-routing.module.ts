import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LayoutComponent } from "./components/shared/layout/layout.component";

const routes: Routes = [
  { path: "", redirectTo: "", pathMatch: "full" },
  {
    path: "",
    component: LayoutComponent,
    loadChildren: "./components/components.module#ComponentsModule",
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

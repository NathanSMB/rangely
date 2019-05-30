workflow "Publish" {
  on = "push"
  resolves = ["[Publish] yarn publish"]
}

action "Filters for GitHub Actions" {
  uses = "actions/bin/filter@3c0b4f0e63ea54ea5df2914b4fabf383368cd0da"
  args = "branch master"
}

action "[Publish] yarn install" {
  uses = "Borales/actions-yarn@1.1.0"
  needs = ["Filters for GitHub Actions"]
  args = "install"
}

action "[Publish] yarn gendocs" {
  uses = "Borales/actions-yarn@1.1.0"
  args = "gendocs"
  needs = ["[Publish] yarn install"]
}

action "[Publish] yarn build" {
  uses = "Borales/actions-yarn@1.1.0"
  needs = ["[Publish] yarn gendocs"]
  args = "build"
}

action "[Publish] yarn test" {
  uses = "Borales/actions-yarn@1.1.0"
  needs = ["[Publish] yarn build"]
  args = "test"
}

action "[Publish] yarn publish" {
  uses = "Borales/actions-yarn@1.1.0"
  needs = ["[Publish] yarn test"]
  secrets = ["NPM_AUTH_TOKEN"]
  args = "publish --access public"
}

workflow "Test and Lint" {
  on = "pull_request"
  resolves = ["Borales/actions-yarn@1.1.0"]
}

action "[Pull] yarn install" {
  uses = "Borales/actions-yarn@1.1.0"
  args = "install"
}

action "[Pull] yarn gendocs" {
  uses = "Borales/actions-yarn@1.1.0"
  needs = ["[Pull] yarn install"]
  args = "gendocs"
}

action "Borales/actions-yarn@1.1.0" {
  uses = "Borales/actions-yarn@1.1.0"
  needs = ["[Pull] yarn gendocs"]
}

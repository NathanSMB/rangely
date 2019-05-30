workflow "Run Tests" {
  on = "pull_request"
  resolves = ["PR - yarn test"]
}

action "PR - yarn install" {
  uses = "Borales/actions-yarn@1.1.0"
  args = "install"
}

action "PR - yarn test" {
  uses = "Borales/actions-yarn@1.1.0"
  needs = ["PR - yarn install"]
  args = "test"
}

action "if branch is master" {
  uses = "actions/bin/filter@3c0b4f0e63ea54ea5df2914b4fabf383368cd0da"
  args = "branch master"
}

action "yarn install" {
  uses = "Borales/actions-yarn@1.1.0"
  needs = ["if branch is master"]
  args = "install"
}

action "yarn test" {
  uses = "Borales/actions-yarn@1.1.0"
  needs = ["yarn install"]
  args = "test"
}

action "yarn gendocs" {
  uses = "Borales/actions-yarn@1.1.0"
  needs = ["yarn install"]
  args = "gendocs"
}

action "yarn build" {
  uses = "Borales/actions-yarn@1.1.0"
  needs = ["yarn install"]
  args = "build"
}

action "yarn publish" {
  uses = "Borales/actions-yarn@1.1.0"
  needs = ["yarn test", "yarn gendocs", "yarn build"]
  args = "publish --access public"
  secrets = ["NPM_AUTH_TOKEN"]
}

workflow "Publish" {
  on = "push"
  resolves = ["Borales/actions-yarn@1.1.0"]
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

action "Borales/actions-yarn@1.1.0" {
  uses = "Borales/actions-yarn@1.1.0"
  needs = ["[Publish] yarn test"]
  secrets = ["NPM_AUTH_TOKEN"]
  args = "publish --access public"
}

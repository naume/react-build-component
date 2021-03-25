# react-component-builder
Helper to build react components

add package to your application
```
yarn add react-build-component --dev
```

configure where you want to create the templates by adding `reactBuildComponent` into your packages.json

example:
```
"reactComponentBuilder": {
  "screenComponents": "src/screens/App/screens", 
  "components": "src/screens/App/components", 
  "commonFactory": "src/common/components", 
  "hoc": "src/shared/decorators" 
}
```

default settings:
```
{
  "components": "src/components",
  "factory": "src/factories",
  "hoc": "src/shared"
}
```

create components using in terminal

```
yarn react-build-component
```


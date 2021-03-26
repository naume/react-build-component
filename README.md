# react-component-builder
Helper to build react components common factories or HoC in proper way

add package to your application
```
yarn add react-build-component --dev
```

you don't want to install that into your package? no problem then just use npx 💪🏻
```
npx react-build-component
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

or create a `.reactBuildComponentrc.json` file with a config:
```
{
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

or by using npx without npm installations
```
npx react-build-component
```



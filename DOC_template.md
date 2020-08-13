# Supplementary Documentation for <PROJECT>

## General considerations

This is a single-page application built in <PARCEL?>, with a small static server in node.js.

## Component structures

### When not logged in

```
<Root>
  └⏤ <Login>
```

### When logged in

```
<Root>
  │⏤ <Header>
  └⏤ <MainComponent>
          │⏤ <SubComponent1>
          │⏤ <SubComponent2>
          └⏤ <SubComponent3>
```
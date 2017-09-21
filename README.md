# khalilstemmler.com

Debugging
- https://stackoverflow.com/questions/32021040/how-to-debug-print-an-object-from-jade

## Hexo Notes

# Helpers in Hexo
These are all really useful little helpers for rendering things

https://hexo.io/docs/helpers.html#list-categories

- There is a page for tags http://localhost:4000/tags/journal/
- There is a page for categories http://localhost:4000/categories/music

## list_tags()
- returns all tags

## Pug Notes
# Rendering a variable containing HTML

```pug
// This is how you render variables that contain HTML in pug
// via https://stackoverflow.com/questions/11191421/rendering-html-in-variable-using-jade
div!= list_tags()
```

# How to see the value of a variable

```pug
pre #{ JSON.stringify(list_tags()) }
```

# How to REALLY see the value of a variable

```pug
script.
  console.log(!{JSON.stringify(item)})
```


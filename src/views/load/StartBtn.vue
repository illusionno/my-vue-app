<template>
<a class="btn-draw"><span>Let's Go!</span></a>

</template>
<script setup>

</script>
<style scoped lang="scss">
// todo 123
// ! 123
// ? 123
// * 123

// Normalize/Reset only elements used
body {
  margin: 0;
  padding: 0;
}

// Mixin for drawing button with optional argument for width, padding, and time
@mixin btn-draw($color,$bg-color, $color-hov, $width: 1px, $padding: 0.5em, $time: 0.2s) {
  position: relative;

  display: inline-block;

  color: $color;
  border-bottom: $width solid $color;
  cursor: pointer;
  overflow: hidden;
  transition: color $time ease-in-out, background-color $time ease-in-out;

  &:after {
    content: '';
    position: absolute;
    right: 0;
    bottom: 0;

    height: 100%;
    width: $width;

    background: $bg-color;
    transform: translateY(100%);
    transition: transform $time ease-in-out;
    transition-delay: $time * 3;
  }

  > span {
    position: relative;

    display: block;
    padding: $padding;

    color: inherit;

    &:before, 
    &:after {
      content: '';
      position: absolute;
      left: 0;
      top: 0;

      background: $color;
      transition: transform $time ease-in-out;
    }

    &:before {
      height: $width;
      width: 100%;
      
      transform: translateX(100%);
      transition-delay: $time * 2;
    }

    &:after {
      height: 100%;
      width: $width;

      transform: translateY(-100%);
      transition-delay: $time;
    }
  }

  &:hover:after, 
  &:hover > span:before, 
  &:hover > span:after {
    transform: translate(0, 0);
  }

  &:hover:after {
    transition-delay: 0s;
  }

  &:hover > span:before {
    transition-delay: $time;
  }

  &:hover > span:after {
    transition-delay: $time * 2;
  }

  &:hover {
    color: $color-hov;
    background-color: $color;
    transition-delay: $time * 3;
  }
}

// Color variables
$color-blue: #5EDFD6;
$color-blue-bg: #14C9C9;
// $color-blue: #324577;
$color-grey: #fff;

// Start of styling
* {
  box-sizing: border-box;
}

body {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100%;
  
  font-family: Doko-Book, serif;
  -webkit-font-smoothing: antialiased;
  background-color: $color-grey;
}

a {
  font-size: 2em;
  text-transform: uppercase;
  text-decoration: none;
  letter-spacing: 0.1em;
}

.btn-draw {
  @include btn-draw($color-blue,$color-blue-bg, $color-grey, 2px);
}

// Base64 font
@font-face {
  font-family: Doko-Book;
  src: url("https://robindelaporte.fr/codepen/play/BwModelicaSS01-ExtraBold.woff") format("woff");
  font-style: normal;
  font-weight: 400;
}
</style>
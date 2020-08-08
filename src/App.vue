<template>
  <div id="app">
    <aside v-if="this.$store.state.logged">
      <ul class="navigation">
        <li>
          Witaj <span>{{ user }}</span>
        </li>
        <li @click="logout()">Wyloguj się</li>
      </ul>
    </aside>
    <router-view />
  </div>
</template>

<script>
export default {
  computed: {
    user() {
      return this.$store.state.userProfile.user.email;
    },
  },
  methods: {
    logout() {
      this.$store.dispatch("logout");
    },
  },
};
</script>

<style lang="scss">
/* http://meyerweb.com/eric/tools/css/reset/ 
   v2.0 | 20110126
   License: none (public domain)
*/
@import "./scss/_variables.scss";
@import "./scss/_extensions.scss";

html,
body,
div,
span,
applet,
object,
iframe,
h1,
h2,
h3,
h4,
h5,
h6,
p,
blockquote,
pre,
a,
abbr,
acronym,
address,
big,
cite,
code,
del,
dfn,
em,
img,
ins,
kbd,
q,
s,
samp,
small,
strike,
strong,
sub,
sup,
tt,
var,
b,
u,
i,
center,
dl,
dt,
dd,
ol,
ul,
li,
fieldset,
form,
label,
legend,
table,
caption,
tbody,
tfoot,
thead,
tr,
th,
td,
article,
aside,
canvas,
details,
embed,
figure,
figcaption,
footer,
header,
hgroup,
menu,
nav,
output,
ruby,
section,
summary,
time,
mark,
audio,
video {
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
  font: inherit;
  vertical-align: baseline;
}
/* HTML5 display-role reset for older browsers */
article,
aside,
details,
figcaption,
figure,
footer,
header,
hgroup,
menu,
nav,
section {
  display: block;
}
body {
  line-height: 1;
}
ol,
ul {
  list-style: none;
}
blockquote,
q {
  quotes: none;
}
blockquote:before,
blockquote:after,
q:before,
q:after {
  content: "";
  content: none;
}
table {
  border-collapse: collapse;
  border-spacing: 0;
}

*,
*::after,
*::before {
  box-sizing: border-box;
}

html {
  font-size: 62.5%;
  background-color: $colorBackground1;
}

.navigation {
  @extend %regular-text;
  display: flex;
  justify-content: space-between;
  margin: 15px 30px;

  li {
    span {
      font-weight: bold;
    }
  }

  li:nth-of-type(2) {
    font-weight: bold;
    text-decoration: underline;
    cursor: pointer;
  }
}
</style>

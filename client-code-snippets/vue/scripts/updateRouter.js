const getFileContent = require("../../frontend-helper-functions/getFileContent.js");
const createFileAndAddContent = require("../../frontend-helper-functions/updateFileContent");
const pluralize = require("pluralize");
const { join } = require("path");

module.exports = (projectDirectory, route) => {
  const mainRouterFile = join(
    projectDirectory,
    "client",
    "src",
    "router",
    "routes.js"
  );
  const capitalizedRoute = route.charAt(0).toUpperCase() + route.slice(1);
  getFileContent.fetchContent(mainRouterFile).then(oldContent => {
    let newContent = oldContent.replace(
      /export default (.*)/,
      `export default [\n  {
    path: "/${pluralize(route)}",
    name: "${capitalizedRoute}",
    component: ${capitalizedRoute}
  },`
    );
    newContent = newContent.replace(
      /\";(?=[^.]*$)/,
      `";\nimport ${capitalizedRoute} from "../components/${capitalizedRoute}";`
    );
    createFileAndAddContent.createFileWithContent(mainRouterFile, newContent);
    createFileAndAddContent.createFileWithContent(
      join(
        projectDirectory,
        "client",
        "src",
        "components",
        `${capitalizedRoute}.vue`
      ),
      vueTemplate(capitalizedRoute)
    );

    const routingFile = join(projectDirectory, 'client', 'src', 'components', 'Hello.vue')
    getFileContent.fetchContent(routingFile).then(oldContent => {
      let capitalizedPluralRoute = pluralize(route).charAt(0).toUpperCase() + pluralize(route).slice(1)
      let newContent = oldContent.replace(/<\/router-link>/, `</router-link>\n<router-link to="/${pluralize(route)}">${capitalizedPluralRoute}</router-link>`);


      createFileAndAddContent.createFileWithContent(routingFile, newContent);
    })
  });
};

vueTemplate = route => `<template>
  <div id="app">
    <h1>This is the ${route} Page</h1>
    <img :src="logo" alt="Logo" />
  </div>
</template>

<script>
import logo from "../assets/logo.png";
import {fetchAPI} from "../api/fetchAPI";

export default {
  name: "${route}",
  data() {
    return {
      logo
    };
  }
};
</script>

<style/>
`;

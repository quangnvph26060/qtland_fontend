<template>
  <div id="app">
    <ckeditor
      :editor="editor"
      v-model="editorData"
      :config="editorConfig"
    ></ckeditor>
  </div>
</template>

<script setup>
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { ref } from "vue";

const editorData = ref("<p>Content of the editor.</p>");
const editor = ClassicEditor;
const editorConfig = {
  toolbar: [
    "heading",
    "|",
    "bold",
    "italic",
    "link",
    "bulletedList",
    "numberedList",
    "blockQuote",
    "imageUpload",
  ],
  heading: {
    options: [
      { model: "paragraph", title: "Văn bản", class: "ck-heading_paragraph" },
      {
        model: "heading1",
        view: "h1",
        title: "Heading 1",
        class: "ck-heading_heading1",
      },
      {
        model: "heading2",
        view: "h2",
        title: "Heading 2",
        class: "ck-heading_heading2",
      },
    ],
  },
};
</script>

<script>
export default {};
</script>

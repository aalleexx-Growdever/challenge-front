<template>
  <v-card dark shaped width="80vw" height="fit-content"
  style="margin-bottom: 2%; text-align: center;" elevation="5">
    <v-list-item two-line>
      <v-list-item-content>
        <v-list-item-title class="text-h5 mb-1">
          {{this.title}}
        </v-list-item-title>
        <v-list-item-content style="text-align: justify; text-indent: 10px;">
          {{this.text}}
        </v-list-item-content>
      </v-list-item-content>

      <v-list-item-avatar
        size="80"
      >
      <img :src="require(`../assets/${this.img}`)">
      </v-list-item-avatar>
    </v-list-item>

    <v-card-actions>
      <v-btn
        outlined
        rounded
        text
        :href="this.to"
        target="_blank"
      >
        Dar uma olhada
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: 'CardLink',
  props: ['to', 'title', 'text', 'img'],
};
</script>

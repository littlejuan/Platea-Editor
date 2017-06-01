<template>
  <div class="columns">
      <div class="column is-10">
        <button v-for="button in buttons" 
        @click="button.onClick" 
        class="button is-dark is-small">
            <b-icon :icon="button.icon" size="is-small"></b-icon>
        </button>
    </div>
    <div class="column is-2">
          <a @click="preview" class="button is-dark">{{previewName}}</a>
          <label for="file-upload" class="custom-file-upload">
          <a class="button is-dark">OPEN</a>
        </label>
        <input @change="videoUrl" id="file-upload" type="file"/>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['currentTime', 'frameRate'],

    data() {
      return {
        previewState: true,
        volumeState: true,
        playState: false,
        previewName: 'PREVIEW',
        buttons: [{icon: 'chevron_left', onClick: this.startKey },
          { icon: 'play_arrow', onClick: this.play},
          {icon: 'chevron_right', onClick: this.endKey},
          {icon: 'volume_up', onClick: this.volume},
        ],
      }
    },
    methods: {
      play() {
        (this.playState=!this.playState) ?
        this.buttons[1].icon = 'pause' :
        this.buttons[1].icon = 'play_arrow';
        this.$emit('play', this.playState);
      },

      startKey() {},

      endKey() {},

      volume() {
        (this.volumeState = !this.volumeState) ?
        this.buttons[3].icon = 'volume_up' :
        this.buttons[3].icon = 'volume_off';
        this.$emit('volume', this.volumeState);
      },

      videoUrl(event){
          let reader = new FileReader();
          reader.readAsDataURL(event.target.files[0]);
          this.$emit('urlChange', URL.createObjectURL(event.target.files[0]));
      },

      preview(){
        (this.previewState = !this.previewState) ? 
        this.previewName='PREVIEW' :
        this.previewName='EDIT MODE';
        this.$emit('preview');
      }
    }
  }

</script>


<style scoped>


  .button{
    margin-right: 0.3em;
  }

  .is-10{
    display: flex;
  }

  .columns{
    background: #656565;
    padding-bottom: 0.5em;
  }

  .column{
    margin-left: 1em;
  }

  a{
      color: white;
      font-size: 13px;
  }

  p{
    color: white;
    font-size: 15px;
    transform: translate(18%, 8%);
    -moz-user-select: none;
    -ms-user-select: none; 
     user-select: none; 
     cursor: default;
  }

  input[type="file"] {
    display: none;
}



  * {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

</style>

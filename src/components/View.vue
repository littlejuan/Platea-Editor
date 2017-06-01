<template>
  <div class="view">
    <div class="columns">
      <div class="column is-9 video-box">
        <video v-if="!onPreview" 
              @timeupdate="onUpdate" width="640" height="360" :src="url" 
              id="prueba" 
              class="center" 
              poster="../../static/poster.png">
        </video>
        <iframe v-else width="640" height="360" 
                src="http://localhost:3000" 
                frameborder="0">
        </iframe>
      </div>
      <div class="column is-3" style="overflow-y: scroll; height:64vh;">
        <div @click.ctrl="save" class="container is-fluid">
          <div>
            <b-field type="is-primary" label="Start Time">
              <b-input v-model="properties.startTime"></b-input>
            </b-field>
            <b-field label="End Time">
              <b-input v-model="properties.endTime"></b-input>
            </b-field>
            <b-field label="Width">
              <b-input v-model="properties.width"></b-input>
            </b-field>
            <b-field label="Height">
              <b-input v-model="properties.height"></b-input>
            </b-field>
          </div>
        </div>
      </div>
    </div>

    <div class="columns">
      <div class="column is-12 control-box">
        <app-controls 
          @preview="onPreview=!onPreview" 
          @urlChange="onUrlChange" 
          @play="onPlay" 
          @volume="onVolume">
        </app-controls>
      </div>
    </div>

  </div>
</template>

<script>
  export default {
    data() {
      return {
        onPreview: false,
        url: '../../static/video2.mp4',
        interactions: [],
        properties: {
          type: 'ELLIPSE',
          startTime: 0,
          endTime: 0,
          width: 0,
          height: 0,
          isPaused: false,
          x: 0,
          y: 0
        }
      }
    },
    methods: {
      onUrlChange(e) {
        let video = document.getElementById("prueba");
        video.pause();
        video.src = e;
        video.load();
      },
      save: function () {
         alert("Hola")
         fetch("http://localhost:3000", {
               method: "POST",
               body: JSON.stringify(this.properties)
           });
        let video = document.getElementById("prueba");
        let interval = this.properties.endTime - this.properties.startTime;
        let value = Math.floor((1122 / video.duration) * interval);
        let x = Math.floor((1122 / video.duration) * this.properties.startTime);
        this.interactions.push({
          name: 'Ellipse',
          color: '#F44336',
          width: value,
          x: x
        });
      },

      onUpdate: function () {
        let video = document.getElementById("prueba");
        let value = Math.floor((1122 / video.duration) * video.currentTime);
        window.plateaTimeline.setCurrent(value + 199);
        console.log(Math.floor(video.duration));
      },
      onPlay(e) {
        let video = document.getElementById("prueba");
        (e) ? video.play(): video.pause();
      },

      onVolume(e) {
        let video = document.getElementById("prueba");
        (e) ? video.muted = false: video.muted = true;
      }
    },

  watch: {
        interactions: (obj) => {
             window.plateaTimeline.addInteraction(obj[obj.length - 1]);
        }
    }

  }

</script>


<style scoped>
  .video-box {
    background: #313131;
    padding: 1.7em;
  }

  .is-fluid {
    padding: 2.6em;
  }

  .is-3 {
    background: #505050;
    color: white;
  }

  b-field {
    backgroundColor: white;
  }

  .center {
    display: block;
    margin: 0 auto;
    width: 640;
    height: auto;
  }

  iframe {
    display: block;
    margin: 0 auto;
  }

</style>

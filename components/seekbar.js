Vue.component('seek-bar', {
  props:['name'],
  template:'<span>Value: {{flooredBarValue}}<span><br>\
    <svg height=50 width=400>\
      <rect x=10 y=10 :width="barWidth" height=10 class="bar" @click="quickSeek"></rect>\
      <rect y=5 width=10 height=20 :x="barPosition" @mousedown="startTracking" class="seeker"></rect>\
    </svg>',
  data:function(){
    return {
      barValue:40,
      barWidth:380,
      start: 0,
      tracked: false,
    }
  },
  computed: {
    barPosition(){
      return (this.barValue/100)*this.barWidth + 5
    },
    flooredBarValue(){
      return Math.floor(this.barValue)
    }
  },
  methods: {
    quickSeek(event){
      console.log(event)
      this.barValue = (event.offsetX - 10)/380*100
    },
    startTracking(event){
      console.log("I'm tracking")
      this.tracked = true
      this.start = event.clientX
    },
    stopTracking(event){
      console.log("I'm stopping tracking")
      this.tracked = false
    },
    track(event){
      if(this.tracked){
        var moved = event.clientX - this.start
        this.start = event.clientX
        console.log("moved "+ moved)
        var newVal = this.barValue + moved/this.barWidth*100
        if(newVal <=0 ){
          newVal = 0
        }
        if(newVal >= 100){
          newVal = 100
        }
        this.barValue = newVal
      }
    }
  },
  mounted() {
    window.addEventListener('mouseup', this.stopTracking);
    window.addEventListener('mousemove', this.track);
  }
})
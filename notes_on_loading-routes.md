## Notes

* Wait until I find a place in my app in which there is a delay due to information loading. Then, generate loading route in ember, and set delay to correspond to the amount of time it takes for page to load.

* `HTML`
<div class="mask">
  <div class="loader" class="rotating"></div>
</div>

* `JS`
<script>
  $(window).load(function() {
    $("#loader").delay(500).fadeOut();
    $(".mask").delay(1000).fadeOut("slow");
});
</script>

* `CSS`
.mask {
  background-color: #fff;
  width: 100%;
  height: 100%;
  position: fixed;
  z-index: 100000;
}

.loader {
  background: url('/assets/img/loader.gif') center center no-repeat;
  height: 31px;
  width: 31px;
  left: 50%;
  top: 50%;
  position: absolute;
  z-index: 100001;
  margin: -15px 0 0 -15px;
}

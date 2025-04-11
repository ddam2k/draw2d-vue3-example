<template>
  <div class="home">
    <div id="draw2d" style="width: 100%; height: 100%;"/>
  </div>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue';
import draw2d from 'draw2d'

var createConnection=function(){
    var connection = new draw2d.Connection();
    var locator = new draw2d.layout.locator.ParallelMidpointLocator();
    var label = new draw2d.shape.basic.Label({text:"I'm a Label"});
    label.setColor(null);
    label.setFontColor("#0d0d0d");

    connection.add(label, locator);
    connection.on("routed",function(){
        label.setText((connection.getAngle()|0)+ " Degree");
    });
    connection.setStroke(2);
    connection.setOutlineStroke(1);
    connection.setOutlineColor("#303030");
    connection.setRouter(null);
    connection.setColor("#91B93E");
    return connection;
};

onMounted(() => {
  const canvas = new draw2d.Canvas('draw2d');

  canvas.installEditPolicy(  new draw2d.policy.connection.DragConnectionCreatePolicy({
            createConnection: createConnection
        }));

  var start = new draw2d.shape.node.Start({x:50, y:250});
  var end   = new draw2d.shape.node.End({x:430, y:150});

  // ...add it to the canvas
  canvas.add( start);
  canvas.add( end);        

  // Create a Connection and connect the Start and End node
  //
  var c = createConnection();
      c.setSource(start.getOutputPort(0));
      c.setTarget(end.getInputPort(0));

  // and finally add the connection to the canvas
  canvas.add(c);

  /////////////////////////////////////////////////////////////////////
  // this is the text in the upper left corner
  /////////////////////////////////////////////////////////////////////
  var msg = new draw2d.shape.note.PostIt({text:"Move the start or destination figure to update the label.\nThe label is always readable and isn't upside down in any cases."});
  canvas.add(msg, 20,20);

})
</script>

<style scoped>
.home {
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
}
</style>
<!--<div class="modal-crop" id="agent-crop-image" title="<?php \MapasCulturais\i::esc_attr_e("Recortar Imagem");?>">
    <form id="form-crop-image"
        class="js-ajax-upload"
        method="post"
        action="<?php //echo $this->controller->createUrl('upload', array('id' => $entity->id)) ?>" 
        enctype="multipart/form-data">
            <img class="modal-content" id="modal-agent-crop-image" src="">
            <input id="x1" name="x1" type="hidden" value="">
            <input id="y1" name="y1" type="hidden" value="">
            <input id="w" name="w" type="hidden" value="">
            <input id="h" name="h" type="hidden" value="">
            <input name="is_crop_upload" type="hidden" value="1">
            <input id="original_image_source" name="original_image_source" type="hidden" value="">
            <input id="original_name" name="original_name" type="hidden" value="">
            <input id="group_name" name="group_name" type="hidden" value="">
            <div id="modal-action">
                <a id="save-crop" class="btn btn-primary"><?php \MapasCulturais\i::esc_attr_e("Salvar");?></a>
                <a id="cancel-crop" class="btn btn-default"><?php \MapasCulturais\i::esc_attr_e("Cancelar");?></a>
            </div>
    </form>
</div>-->

<div class="modal-crop" id="modal-crop-image">
    <div class="imageBox">
        <div class="thumbBox"></div>
        <div class="spinner" style="display: none">Loading...</div>
    </div>
    <form class="js-ajax-upload" method="post" id="form-crop-image" action="<?php echo $this->controller->createUrl('upload', array('id' => $entity->id)) ?>" 
          enctype="multipart/form-data">
          <img id="image-resized" src="" />
    </form>
    <div class="action">
        <input type="file" id="file" style="float:left; width: 250px">
        <input type="button" id="btnCrop" value="Crop" style="float: right">
        <input type="button" id="btnZoomIn" value="+" style="float: right">
        <input type="button" id="btnZoomOut" value="-" style="float: right">
    </div>
    <div class="cropped">

    </div>
</div>

<script type="text/javascript">
        var options =
        {
            thumbBox: '.thumbBox',
            spinner: '.spinner',
            imgSrc: ''
        };

        var cropper;
        $('#file').on('change', function(){
            var reader = new FileReader();
            reader.onload = function(e) {
                options.imgSrc = e.target.result;
                cropper = $('.imageBox').cropbox(options);
            }
            reader.readAsDataURL(this.files[0]);
            this.files = [];
        });

        $('#btnCrop').on('click', function(){
            var elem = cropper.getBlob();
            var url = "<?php echo $this->controller->createUrl('upload', array('id' => $entity->id)) ?>";
            var formData = new FormData();

            formData.append('avatar', elem);

            $.ajax({
                url: url,
                type: "POST",
                data : formData,
                processData: false,  
                contentType: false,
                success: function(result){
                
                }
        });

        $('#btnZoomIn').on('click', function(){
            cropper.zoomIn();
        });

        $('#btnZoomOut').on('click', function(){
            cropper.zoomOut();
        });
    });
</script>
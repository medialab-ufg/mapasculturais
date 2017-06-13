<form id="form-crop-image" 
      class="js-ajax-upload"
      method="post"
      action="<?php echo $this->controller->createUrl('upload', array('id' => $entity->id)) ?>" 
      enctype="multipart/form-data">
    <div class="modal-crop" id="agent-crop-image" title="<?php \MapasCulturais\i::esc_attr_e("Recortar Imagem");?>">
        <span class="close">&times;</span>
        <img class="modal-content" id="modal-agent-crop-image" src="">
        <input id="x1" name="x1" type="hidden" value="">
        <input id="x2" name="x2" type="hidden" value="">
        <input id="y1" name="y1" type="hidden" value="">
        <input id="y2" name="y2" type="hidden" value="">
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
    </div>
</form>
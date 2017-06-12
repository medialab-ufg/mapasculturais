<?php $this->applyTemplateHook('avatar','before'); ?>
<!--.avatar-->
<div class="avatar <?php if($entity->avatar): ?>com-imagem<?php endif; ?>">
    <?php if($avatar = $entity->avatar): ?>
        <img src="<?php echo $avatar->transform('avatarBig')->url; ?>" alt="" class="js-avatar-img" />
    <?php else: ?>
        <img class="js-avatar-img" src="<?php $this->asset($default_image); ?>" />
    <?php endif; ?>
    <?php if($this->isEditable()): ?>
        <a class="btn btn-default edit js-open-editbox" data-target="#editbox-change-avatar" href="#"><?php \MapasCulturais\i::_e("Editar");?></a>
        <div id="editbox-change-avatar" class="js-editbox mc-right" title="<?php \MapasCulturais\i::esc_attr_e("Editar avatar");?>">
            <?php $this->ajaxUploader($entity, 'avatar', 'image-src', 'div.avatar img.js-avatar-img', '', 'avatarBig', '', '.jpg ou .png',  true); ?>
        </div>
    <?php endif; ?>
</div>

<!-- The Modal -->
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
        <input type="file" name="avatar" />
        <input name="is_crop_upload" type="hidden">
        <input id="original_image_source" name="original_image_source" type="hidden" value="">
        <div id="modal-action">
            <a id="save-crop" class="btn btn-primary"><?php \MapasCulturais\i::esc_attr_e("Salvar");?></a>
            <a id="cancel-crop" class="btn btn-default"><?php \MapasCulturais\i::esc_attr_e("Cancelar");?></a>
        </div>
    </div>
</form>

<?php $this->applyTemplateHook('avatar','after'); ?>

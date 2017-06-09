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
            <?php $this->ajaxUploader ($entity, 'avatar', 'image-src', 'div.avatar img.js-avatar-img', '', 'avatarBig', '', '.jpg ou .png',  true); ?>
        </div>
    <?php endif; ?>
</div>

<!-- The Modal -->
<form id="form-crop-image">
    <div class="modal-crop" id="agent-crop-image" title="<?php \MapasCulturais\i::esc_attr_e("Recortar Imagem");?>">
        <span class="close">&times;</span>
        <img class="modal-content" id="modal-agent-crop-image">

        <div id="modal-action">
            <a id="save-crop" class="btn btn-primary"><?php \MapasCulturais\i::esc_attr_e("Salvar");?></a>
            <a id="cancel-crop" class="btn btn-default"><?php \MapasCulturais\i::esc_attr_e("Cancelar");?></a>
        </div>
    </div>
</form>

<?php $this->applyTemplateHook('avatar','after'); ?>

<script lang="ts" setup>
import { ref } from 'vue';

import { useVbenModal } from '@vben/common-ui';

import { message } from 'ant-design-vue';

import { useVbenForm } from '#/adapter/form';
import { sysUserDetail, sysUserSave, sysUserUpdate } from '#/api/sys/user';

import { formSchamas } from './schemas';

const record = ref();
const isUpdate = ref(false);
const gridApi = ref();

const [UserForm, formApi] = useVbenForm({
  showDefaultActions: false,
  ...formSchamas,
});
const [Modal, modalApi] = useVbenModal({
  onOpenChange(isOpen) {
    isUpdate.value = modalApi.getData()?.isUpdate ?? false;
    record.value = isOpen ? modalApi.getData()?.record || {} : {};
    gridApi.value = isOpen ? modalApi.getData()?.gridApi : null;
    if (isOpen && isUpdate.value) {
      sysUserDetail({
        id: record.value?.id,
      }).then((data) => {
        formApi.setValues(data);
      });
    } else {
      formApi.setValues(record.value);
    }
  },
  onConfirm() {
    formApi.validate().then(async (e: any) => {
      if (e.valid) {
        const values = await formApi.getValues();
        modalApi.setState({ loading: true, confirmLoading: true });
        const submitApi = isUpdate.value ? sysUserUpdate : sysUserSave;
        submitApi(values)
          .then(() => {
            message.success('保存成功');
            gridApi.value?.reload();
            modalApi.close();
          })
          .finally(() => {
            modalApi.setState({ loading: false, confirmLoading: false });
          });
      }
    });
  },
});
defineExpose(modalApi);
</script>
<template>
  <Modal :title="isUpdate ? '编辑用户' : '新增用户'" class="w-[60%]">
    <div class="common-form">
      <UserForm />
    </div>
  </Modal>
</template>
<style scoped lang="less">
@import '#/assets/styles/common-form.less';
</style>

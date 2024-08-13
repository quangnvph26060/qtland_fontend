<template>
  <a-modal
    :title="title"
    cancelText="Huỷ"
    okText="Lưu"
    :onOk="handleOkModal"
    :onCancel="() => onChangePassword(true)"
    :confirm-loading="loading"
    class="top-[20%]"
  >
    <a-form
      layout="horizontal"
      :label-col="{ span: 8 }"
      :wrapper-col="{ span: 16 }"
    >
      <a-form-item
        label="Tên"
        class="mt-3"
        :rules="[{ required: true, message: 'Hãy nhập tên!' }]"
      >
        <a-input v-model:value="user.name" />
      </a-form-item>
      <a-form-item
        label="Email"
        :rules="[{ required: true, message: 'Hãy nhập email!' }]"
      >
        <a-input v-model:value="user.email" />
      </a-form-item>
      <a-form-item
        label="Căn cước công dân"
        :rules="[{ required: true, message: 'Hãy nhập căn cước công dân!' }]"
      >
        <a-input v-model:value="user.cccd" />
      </a-form-item>
      <a-form-item
        label="Ngày sinh"
        :rules="[{ required: false, message: 'Hãy chọn ngày sinh!' }]"
      >
        <!-- <a-date-picker style="width: 100%;" v-model:value="user.birthday" format="YYYY-MM-DD" /> -->
        <a-input
          v-model:value="user.birthday"
          type="date"
          format="YYYY-MM-DD"
        />
      </a-form-item>

      <a-form-item
        label="Số điện thoại"
        :rules="[{ required: true, message: 'Hãy nhập số điện thoại!' }]"
      >
        <a-input v-model:value="user.phone" />
      </a-form-item>
      <a-form-item
        label="Đơn vị công tác"
        :rules="[{ required: false, message: 'Hãy nhập đơn vị công tác!' }]"
      >
        <a-input v-model:value="user.workunit" />
      </a-form-item>
      <a-form-item
        label="Mật khẩu"
        :rules="[{ required: true, message: 'Hãy nhập mật khẩu!' }]"
      >
        <div class="grid grid-cols-10 gap-2">
          <a-input
            v-model:value="user.password"
            :class="
              props.title === 'Sửa' ? 'col-span-6 lg:col-span-7' : 'col-span-10'
            "
            :disabled="!changePassword && props.title === 'Sửa'"
          />
          <a-button
            type="primary"
            class="col-span-3 lg:col-span-3"
            v-if="props.title === 'Sửa'"
            @click="onChangePassword(false)"
          >
            Thay đổi
          </a-button>
        </div>
      </a-form-item>
     
      <a-form-item
        label="Vai trò"
        :rules="[{ required: true, message: 'Hãy nhập vai trò !' }]"
      >
        <a-select v-model:value="user.role_id">
          <a-select-option :value="1" v-if="store.user.role_id === 1">Supper Admin</a-select-option>
          <a-select-option :value="6" v-if="store.user.role_id === 1">Admin</a-select-option>
          <a-select-option :value="5">Đầu chủ VIP</a-select-option>
          <a-select-option :value="2">Đầu chủ</a-select-option>
          <a-select-option :value="4">Sale VIP</a-select-option>
          <a-select-option :value="3">Sale</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="Trạng thái">
        <a-select v-model:value="user.is_active">
          <a-select-option :value="1">Hoạt động</a-select-option>
          <a-select-option :value="0">Không hoạt động</a-select-option>
        </a-select>
      </a-form-item>
    </a-form>
  </a-modal>
</template>
<script setup>
import { reactive, ref, watch } from "vue";
import updateUserAPI from "../../../api/users/updateUser";
import createUserAPI from "../../../api/users/createUser";
import sendEmailAPI from "../../../api/users/email";
import messageAnt from "../../../scripts/message";
import { message } from "ant-design-vue";
import auth from "../../../stores/auth";
 const store = auth();
const props = defineProps({
  title: String,
  userSelected: Object,
});

const emits = defineEmits(["isShowDetail", "updateUserList"]);

function capitalizeFirstLetter(name) {
  if (!name || name.length === 0) return name;
  return name
    .split(" ")
    .map((word) => word[0].toUpperCase() + word.slice(1))
    .join(" ");
}

const loading = ref(false);
const user = reactive({
  name: "",
  email: "",
  password: "",
  role_id: "",
  is_active: "",
  cccd: "",
  phone: "",
  address: "",
  workunit: "",
  birthday: "",
});
const errors = ref({});

const changePassword = ref(false);
function onChangePassword(modalClose = false) {
  changePassword.value = !changePassword.value;

  if (modalClose) {
    changePassword.value = false;
  }
}

// Theo dõi sự thay đổi của userSelected
watch(
  () => props.userSelected,
  (newValue, oldValue) => {
    if (newValue) {
      user.id = newValue.id;
      user.name = newValue.name;
      user.email = newValue.email;
      user.password = newValue.password;
      user.role_id = newValue.role_id;
      user.birthday = newValue.birthday;
      user.phone = newValue.phone;
      user.cccd = newValue.cccd;
      user.address = newValue.address;
      user.workunit = newValue.workunit;
      user.is_active = newValue.is_active;
    }
  }
);

const handleOkModal = async () => {
  loading.value = true;
  if (
    user.name === "" ||
    user.email === "" ||
    (user.password === "" && props.title === "Thêm mới")
  ) {
    messageAnt.error("Vui lòng nhập đầy đủ thông tin");
    loading.value = false;
    return;
  }

  if (props.title === "Thêm mới") {
    const information = {
      name: capitalizeFirstLetter(user.name),
      email: user.email,
      password: user.password,
      role_id: user.role_id,
      is_active: user.is_active,
      cccd: user.cccd,
      phone: user.phone,
      address: user.address,
      workunit: user.workunit,
      birthday: user.birthday,
    };
    /**
     * Hàm thêm mới người dùng
     * @param {Object} information
     * CreatedBy: youngbachhh (28/03/2024)
     */
    const fetchCreateUser = async (information) => {
      try {
        await createUserAPI(information);
        const emailData = {
          email: information.email,
          password: information.password,
          name: information.name,
        };
        await sendEmailAPI(emailData);
        emits("updateUserList");
        messageAnt.success("Thêm mới người dùng thành công!");
      } catch (error) {
        message.error("Thêm mới người dùng thất bại!");
        errors.value = error.responsive.data.errors;
      } finally {
        emits("isShowDetail", false);
        loading.value = false;
      }
    };
    fetchCreateUser(information);
  } else if (props.title === "Sửa") {
    const id = user.id;
    const information = {
      name: user.name,
      email: user.email,
      password: user.password,
      role_id: user.role_id,
      is_active: user.is_active,
      cccd: user.cccd,
      phone: user.phone,
      address: user.address,
      workunit: user.workunit,
      birthday: user.birthday,
    };
    /**
     * Hàm cập nhật dữ liệu người dùng
     * @param {String} id, {Object} information
     * CreatedBy: youngbachhh (28/03/2024)
     */
    const fetchUpdateUser = async (id, information) => {
      try {
        await updateUserAPI(id, information);
        emits("updateUserList");
        messageAnt.success("Cập nhật thông tin thành công!");
        if (information.password !== null) {
          const emailData = {
            email: information.email,
            password: information.password,
            name: information.name,
          };
          await sendEmailAPI(emailData);
        }
      } catch (error) {
        errors.value = error.responsive.data.errors;
      } finally {
        emits("isShowDetail", false);
        loading.value = false;
      }
    };

    fetchUpdateUser(id, information);
  }
};
</script>

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
        class="col-md-12"
        label="Giới tính"
        :validateStatus="errors.gender ? 'error' : undefined"
        :help="errors.gender"
      >
        <a-select v-model:value="user.gender">
          <a-select-option :value="'Nam'">Nam</a-select-option>
          <a-select-option :value="'Nữ'">Nữ</a-select-option>
        </a-select>
      </a-form-item>

      <a-form-item
        label="Số điện thoại"
        :rules="[{ required: true, message: 'Hãy nhập số điện thoại!' }]"
      >
        <a-input v-model:value="user.phone" />
      </a-form-item>

      <a-form-item
        label="Địa chỉ"
        :rules="[{ required: false, message: 'Hãy nhập địa chỉ!' }]"
      >
        <a-input v-model:value="user.address" />
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
          <a-select-option :value="1" v-if="store.user.role_id === 1"
            >Supper Admin</a-select-option
          >
          <a-select-option :value="6" v-if="store.user.role_id === 1"
            >Admin</a-select-option
          >
          <a-select-option :value="5">Đầu chủ VIP</a-select-option>
          <a-select-option :value="2">Đầu chủ</a-select-option>
          <a-select-option :value="4">Sale VIP</a-select-option>
          <a-select-option :value="3">Sale</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item
        class="permission_label"
        v-if="user.role_id != ''"
        label="Quyền truy cập"
      ></a-form-item>
      <div class="pressmison_mobi">
        <a-form-item v-if="user.role_id != ''">
          <div class="d-flex flex-column main-pressmison">
            <span class="d-flex gap-3">
              <input
                type="checkbox"
                value="1"
                v-model="user.access_permission_1"
              />
              <span>Văn phòng hạng A</span>
            </span>
            <span class="d-flex gap-3">
              <input
                type="checkbox"
                value="2"
                v-model="user.access_permission_2"
              />
              <span>Văn phòng hạng B</span>
            </span>
            <span class="d-flex gap-3">
              <input
                type="checkbox"
                value="3"
                v-model="user.access_permission_3"
              />
              <span>Văn phòng hạng C</span>
            </span>
            <span class="d-flex gap-3">
              <input
                type="checkbox"
                value="4"
                v-model="user.access_permission_4"
              />
              <span>Văn phòng hạng D</span>
            </span>
            <span class="d-flex gap-3">
              <input
                type="checkbox"
                value="5"
                v-model="user.access_permission_5"
              />
              <span>Mặt bằng kinh doanh</span>
            </span>
          </div>
        </a-form-item>
      </div>
      <a-form-item label="Trạng thái">
        <a-select v-model:value="user.is_active">
          <a-select-option :value="1">Hoạt động</a-select-option>
          <a-select-option :value="0">Không hoạt động</a-select-option>
        </a-select>
      </a-form-item>
      <div class="row" style="margin: 0px auto">
        <div class="col-md-12 form-group mb-4 align-items-center">
          <label class="me-2" style="font-size: 15px">Mặt trước CCCD:</label>
          <input
            type="file"
            class="form-control mt-2"
            style="padding: 4px 10px; max-width: 420px"
            @change="onFileChangeCCCDTRC"
          />
          <div v-if="errors.cccd_trc" class="error-message">
            {{ errors.cccd_trc }}
          </div>
        </div>

        <div class="col-md-12 form-group mb-4 align-items-center">
          <label class="me-2" style="font-size: 15px">Mặt sau CCCD:</label>
          <input
            type="file"
            class="form-control mt-2"
            style="padding: 4px 10px; max-width: 420px"
            @change="onFileChangeCCCDSAU"
          />
          <div v-if="errors.cccd_sau" class="error-message">
            {{ errors.cccd_sau }}
          </div>
        </div>
      </div>
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
  access_permission_1: "",
  access_permission_2: "",
  access_permission_3: "",
  access_permission_4: "",
  access_permission_5: "",
  cccd_trc: "",
  cccd_sau: "",
  gender: "",
});

console.log(user);
const errors = ref({});

const changePassword = ref(false);
function onChangePassword(modalClose = false) {
  changePassword.value = !changePassword.value;

  if (modalClose) {
    changePassword.value = false;
  }
}

const onFileChangeCCCDTRC = (e) => {
  user.cccd_trc = e.target.files[0];
};

const onFileChangeCCCDSAU = (e) => {
  user.cccd_sau = e.target.files[0];
};

// Theo dõi sự thay đổi của userSelected
watch(
  () => props.userSelected,
  (newValue, oldValue) => {
    // console.log(newValue);
    if (newValue) {
      console.log("User gender:", user);
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
      user.cccd_trc = newValue.cccd_trc;
      user.cccd_sau = newValue.cccd_sau;
      user.gender = newValue.gender;
      user.access_permission_1 =
        +newValue.access_permission_1 === 1 ? true : false;
      user.access_permission_2 =
        +newValue.access_permission_2 === 2 ? true : false;
      user.access_permission_3 =
        +newValue.access_permission_3 === 3 ? true : false;
      user.access_permission_4 =
        +newValue.access_permission_4 === 4 ? true : false;
      user.access_permission_5 =
        +newValue.access_permission_5 === 5 ? true : false;
    }
  }
);

const handleOkModal = async () => {
  loading.value = true;
  if (
    user.name === "" ||
    user.email === "" ||
    user.cccd_trc === "" ||
    user.cccd_sau === "" ||
    user.cccd === "" || user.gender == null || user.cccd === '' ||
    (user.password === "" && props.title === "Thêm mới")
  ) {
    messageAnt.error("Vui lòng nhập đầy đủ thông tin");
    loading.value = false;
    return;
  }

  const formData = new FormData();
  console.log(user.name);
  const commonInformation = {
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
    access_permission_1: user.access_permission_1 === true ? 1 : 0,
    access_permission_2: user.access_permission_2 === true ? 2 : 0,
    access_permission_3: user.access_permission_3 === true ? 3 : 0,
    access_permission_4: user.access_permission_4 === true ? 4 : 0,
    access_permission_5: user.access_permission_5 === true ? 5 : 0,
    gender: user.gender,
    cccd_trc: user.cccd_trc,
    cccd_sau: user.cccd_sau,
  };

  // Thêm thông tin chung vào FormData
  for (const key in commonInformation) {
    formData.append(key, commonInformation[key]);
  }

  // Thêm file cccd_trc và cccd_sau vào FormData nếu có
  if (user.cccd_trc) {
    formData.append("cccd_trc", user.cccd_trc);
  }
  if (user.cccd_sau) {
    formData.append("cccd_sau", user.cccd_sau);
  }

  if (props.title === "Thêm mới") {
    /**
     * Hàm thêm mới người dùng
     * @param {FormData} formData
     * CreatedBy: youngbachhh (28/03/2024)
     */
    const fetchCreateUser = async (formData) => {
      try {
        await createUserAPI(formData);
        const emailData = {
          email: commonInformation.email,
          password: commonInformation.password,
          name: commonInformation.name,
        };
        await sendEmailAPI(emailData);
        emits("updateUserList");
        messageAnt.success("Thêm mới người dùng thành công!");
      } catch (error) {
        message.error("Thêm mới người dùng thất bại!");
        errors.value = error.response.data.errors; // Sửa typo từ 'responsive' thành 'response'
      } finally {
        emits("isShowDetail", false);
        loading.value = false;
      }
    };

    fetchCreateUser(formData);
  } else if (props.title === "Sửa") {
    const id = user.id;
    /**
     * Hàm cập nhật dữ liệu người dùng
     * @param {String} id, {FormData} formData
     * CreatedBy: youngbachhh (28/03/2024)
     */
    const fetchUpdateUser = async (id, formData) => {
      try {
        await updateUserAPI(id, formData);
        emits("updateUserList");
        messageAnt.success("Cập nhật thông tin thành công!");
        if (commonInformation.password) {
          const emailData = {
            email: commonInformation.email,
            password: commonInformation.password,
            name: commonInformation.name,
          };
          await sendEmailAPI(emailData);
        }
      } catch (error) {
        errors.value = error.response.data.errors; // Sửa typo từ 'responsive' thành 'response'
      } finally {
        emits("isShowDetail", false);
        loading.value = false;
      }
    };

    fetchUpdateUser(id, formData);
  }
};
</script>
<style scoped>
.main-pressmison {
  position: relative;
  left: 51%;
}
</style>
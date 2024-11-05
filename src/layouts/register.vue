<template>
  <div class="form-container" style="padding: 30px 20px">
    <div style="text-align: center; font-size: 25px" class="mb-4">
      <h1>Đăng ký tài khoản</h1>
    </div>
    <a-form
      layout="horizontal"
      :label-col="{ span: 6 }"
      :wrapper-col="{ span: 18 }"
    >
      <div class="form-grid">
        <div class="row">
          <a-form-item
            class="col-md-6"
            label="Vai trò"
            :validateStatus="errors.role_id ? 'error' : undefined"
            :help="errors.role_id"
          >
            <a-select
              v-model:value="user.role_id"
              @blur="validateField('role_id')"
            >
              <a-select-option :value="5">Đầu chủ VIP</a-select-option>
              <a-select-option :value="2">Đầu chủ</a-select-option>
              <a-select-option :value="4">Sale VIP</a-select-option>
              <a-select-option :value="3">Sale</a-select-option>
            </a-select>
          </a-form-item>

          <a-form-item
            class="col-md-6"
            label="Số CCCD"
            :validateStatus="errors.cccd ? 'error' : undefined"
            :help="errors.cccd"
          >
            <a-input v-model:value="user.cccd" @blur="validateField('cccd')" />
          </a-form-item>
        </div>
        <div class="row">
          <a-form-item v-if="user.role_id" label="Quyền truy cập">
            <div class="pressmison_mobi">
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
                  <span>Văn phòng hạng E</span>
                </span>
              </div>
            </div>
          </a-form-item>
        </div>
        <div class="row">
          <a-form-item
            class="col-md-6"
            label="Họ và tên"
            :validateStatus="errors.name ? 'error' : undefined"
            :help="errors.name"
          >
            <a-input v-model:value="user.name" @blur="validateField('name')" />
          </a-form-item>
          <a-form-item
            class="col-md-6"
            label="Năm sinh"
            :validateStatus="errors.birthday ? 'error' : undefined"
            :help="errors.birthday"
          >
            <a-date-picker
              style="width: 100%"
              v-model:value="user.birthday"
              @blur="validateField('birthday')"
            />
          </a-form-item>
        </div>
        <div class="row">
          <a-form-item
            class="col-md-6"
            label="Giới tính"
            :validateStatus="errors.gender ? 'error' : undefined"
            :help="errors.gender"
          >
            <a-select
              v-model:value="user.gender"
              @blur="validateField('gender')"
            >
              <a-select-option :value="'Nam'">Nam</a-select-option>
              <a-select-option :value="'Nữ'">Nữ</a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item
            class="col-md-6"
            label="Quê quán"
            :validateStatus="errors.address ? 'error' : undefined"
            :help="errors.address"
          >
            <a-input
              v-model:value="user.address"
              @blur="validateField('address')"
            />
          </a-form-item>
        </div>
        <div class="row">
          <a-form-item
            class="col-md-6"
            label="Nơi thường trú"
            :validateStatus="errors.workunit ? 'error' : undefined"
            :help="errors.workunit"
          >
            <a-input
              v-model:value="user.workunit"
              @blur="validateField('workunit')"
            />
          </a-form-item>
          <a-form-item
            class="col-md-6"
            label="Số điện thoại"
            :validateStatus="errors.phone ? 'error' : undefined"
            :help="errors.phone"
          >
            <a-input
              v-model:value="user.phone"
              @blur="validateField('phone')"
            />
          </a-form-item>
        </div>
        <div class="row">
          <a-form-item
            class="col-md-6"
            label="Email"
            :validateStatus="errors.email ? 'error' : undefined"
            :help="errors.email"
          >
            <a-input
              v-model:value="user.email"
              @blur="validateField('email')"
            />
          </a-form-item>
          <a-form-item
            class="col-md-6"
            label="Mật khẩu"
            :validateStatus="errors.password ? 'error' : undefined"
            :help="errors.password"
          >
            <a-input
              v-model:value="user.password"
              type="password"
              @blur="validateField('password')"
            />
          </a-form-item>
        </div>
      </div>
      <a-form-item class="col-md-6" label="Trạng thái" style="display: none">
        <a-select v-model:value="user.is_active">
          <a-select-option :value="2">Chờ duyệt</a-select-option>
        </a-select>
      </a-form-item>

      <div class="row mt-3" style="margin: 0px auto">
        <div class="col-md-6 form-group mb-4 align-items-center">
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

        <div class="col-md-6 form-group mb-4 align-items-center">
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

      <a-form-item>
        <a-button type="primary" @click="handleOkModal" :loading="loading"
          >Đăng ký</a-button
        >
      </a-form-item>
    </a-form>
  </div>
</template>


<script setup>
import { reactive, ref, watch } from "vue";
import updateUserAPI from "../api/users/updateUser";
import createUserAPI from "../api/users/createUser";
import sendEmailAPI from "../api/users/email";
import messageAnt from "../scripts/message";
import auth from "../stores/auth";

const store = auth();
const props = defineProps({
  title: String,
  userSelected: Object,
});

const emits = defineEmits(["isShowDetail", "updateUserList"]);

const loading = ref(false);
const user = reactive({
  name: "",
  email: "",
  password: "",
  role_id: "",
  is_active: 2, // Assume default is active
  cccd: "",
  phone: "",
  address: "",
  workunit: "",
  birthday: "",
  access_permission_1: 0,
  access_permission_2: 0,
  access_permission_3: 0,
  access_permission_4: 0,
  access_permission_5: 0,
  cccd_trc: null,
  cccd_sau: null,
  gender: "",
});

// Keep track of errors for each field
const errors = reactive({
  name: "",
  email: "",
  password: "",
  cccd: "",
  phone: "",
  birthday: "",
  workunit: "",
  role_id: "",
  cccd_trc: "",
  cccd_sau: "",
  gender: "",
  address: "",
});

// File change handlers
const onFileChangeCCCDTRC = (e) => {
  user.cccd_trc = e.target.files[0];
  validateField("cccd_trc");
};

const onFileChangeCCCDSAU = (e) => {
  user.cccd_sau = e.target.files[0];
  validateField("cccd_sau");
};

// Watch for user selection updates
watch(
  () => props.userSelected,
  (newValue) => {
    if (newValue) {
      Object.assign(user, {
        ...newValue,
        access_permission_1: newValue.access_permission_1 === 1 ? 1 : 0,
        access_permission_2: newValue.access_permission_2 === 2 ? 2 : 0,
        access_permission_3: newValue.access_permission_3 === 3 ? 3 : 0,
        access_permission_4: newValue.access_permission_4 === 4 ? 4 : 0,
        access_permission_5: newValue.access_permission_5 === 5 ? 5 : 0,
      });
    }
  }
);

// Field validation function
const validateField = (field) => {
  errors[field] = "";
  switch (field) {
    case "name":
      if (!user.name) errors.name = "Hãy nhập tên!";
      break;
    case "email":
      if (!user.email) {
        errors.email = "Hãy nhập email!";
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(user.email)) {
        errors.email = "Email không đúng định dạng!";
      }
      break;
    case "cccd":
      if (!user.cccd) errors.cccd = "Hãy nhập số căn cước công dân!";
      break;
    case "password":
      if (!user.password) errors.password = "Hãy nhập mật khẩu!";
      break;
    case "phone":
      if (!user.phone) errors.phone = "Hãy nhập số điện thoại!";
      break;
    case "birthday":
      if (!user.birthday) errors.birthday = "Hãy nhập ngày sinh!";
      break;
    case "workunit":
      if (!user.workunit) errors.workunit = "Hãy nhập đơn vị công tác!";
      break;
    case "role_id":
      if (!user.role_id) errors.role_id = "Hãy chọn vai trò!";
      break;
    case "cccd_trc":
      if (!user.cccd_trc) {
        errors.cccd_trc = "Hãy tải lên mặt trước căn cước công dân!";
      } else {
        // Kiểm tra định dạng tệp
        const validImageTypes = ["image/jpeg", "image/png", "image/gif"];
        if (!validImageTypes.includes(user.cccd_trc.type)) {
          errors.cccd_trc =
            "Định dạng tệp không hợp lệ! Chỉ chấp nhận jpg, png, gif.";
        } 
        else if (user.cccd_trc.size > 2 * 1024 * 1024) { // Kiểm tra kích thước tệp
          errors.cccd_trc = "Kích thước tệp không được lớn hơn 2MB!";
        }
      }
      break;

    case "cccd_sau":
      if (!user.cccd_sau) {
        errors.cccd_sau = "Hãy tải lên mặt sau căn cước công dân!";
      } else {
        // Kiểm tra định dạng tệp
        const validImageTypes = ["image/jpeg", "image/png", "image/gif"];
        if (!validImageTypes.includes(user.cccd_sau.type)) {
          errors.cccd_sau =
            "Định dạng tệp không hợp lệ! Chỉ chấp nhận jpg, png, gif.";
        } 
        else if (user.cccd_sau.size > 2 * 1024 * 1024) { // Kiểm tra kích thước tệp
          errors.cccd_sau = "Kích thước tệp không được lớn hơn 2MB!";
        }
      }
      break;

    case "gender":
      if (!user.gender) errors.gender = "Hãy chọn giới tính!";
      break;
    case "address":
      if (!user.address) errors.address = "Hãy nhập thông tin địa chỉ!";
      break;
    default:
      break;
  }
};

// Handle modal submission
const handleOkModal = async () => {
  for (const field in user) {
    validateField(field);
  }

  if (Object.values(errors).some((error) => error)) {
    messageAnt.error("Hãy kiểm tra thông tin đã nhập!");
    return;
  }

  loading.value = true;

  // Sử dụng FormData để chứa dữ liệu
  const formData = new FormData();
  formData.append("name", user.name);
  formData.append("email", user.email);
  formData.append("password", user.password);
  formData.append("role_id", user.role_id);
  formData.append("is_active", user.is_active);
  formData.append("cccd", user.cccd);
  formData.append("gender", user.gender);
  formData.append("phone", user.phone);
  formData.append("address", user.address);
  formData.append("workunit", user.workunit);
  formData.append(
    "birthday",
    new Date(user.birthday).toISOString().split("T")[0]
  );
  formData.append("access_permission_1", user.access_permission_1 ? 1 : 0);
  formData.append("access_permission_2", user.access_permission_2 ? 2 : 0);
  formData.append("access_permission_3", user.access_permission_3 ? 3 : 0);
  formData.append("access_permission_4", user.access_permission_4 ? 4 : 0);
  formData.append("access_permission_5", user.access_permission_5 ? 5 : 0);

  // Gắn ảnh vào FormData
  if (user.cccd_trc) formData.append("cccd_trc", user.cccd_trc);
  if (user.cccd_sau) formData.append("cccd_sau", user.cccd_sau);

  // Gửi request API
  try {
    const response = await createUserAPI(formData);

    const emailData = {
      email: user.email,
      password: user.password,
      name: user.name,
    };
    await sendEmailAPI(emailData);
    messageAnt.success("Tạo người dùng thành công!");
    window.location.href = "/login";
    emits("updateUserList");
    emits("isShowDetail", false);
  } catch (error) {
    messageAnt.error("Có lỗi xảy ra khi tạo người dùng!");
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
/* .form-grid {
  margin-top: 20px;
} */
.error-message {
  color: red;
  font-size: 12px;
}
a-form-item label {
  font-weight: bold;
  font-size: 15px;
  white-space: normal; /* Cho phép nhãn xuống dòng */
  word-break: break-word; /* Ngắt từ khi quá dài */
}

.form-container {
  max-width: 850px;
  margin: auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin-top: 0px !important;
}

.form-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
}

.row {
  display: flex;
  flex: 1 1 100%;
  /* gap: 16px; */
}

.col-md-6 {
  flex: 1;
}

input[type="file"] {
  max-width: 100%;
}

.pressmison_mobi {
  padding: 8px;
  background-color: #fff;
  border-radius: 6px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.main-pressmison span {
  display: flex;
  align-items: center;
  font-size: 14px;
}

.error-message {
  color: #ff4d4f;
  font-size: 12px;
}

a-button[type="primary"] {
  width: 100%;
  max-width: 200px;
  margin: 20px auto 0;
  display: block;
}
.ant-form-item {
  margin: 0px !important;
}

@media (max-width: 768px) {
  .form-container {
    padding: 15px;
  }

  .form-grid {
    gap: 0px !important;
  }

  /* .row {
    flex-direction: column;
  } */

  .col-md-6 {
    flex: 1 1 100%;
  }

  a-form-item label {
    font-size: 14px;
  }

  .error-message {
    font-size: 11px;
  }
}
</style>

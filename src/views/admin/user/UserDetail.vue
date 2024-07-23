<template>
    <a-modal
        :title="title"
        cancelText="Huỷ"
        okText="Lưu"
        class="top-[20%]"
        :onOk="
            () => {
                handleOkModal();
            }
        "
        :onCancel="
            () => {
                onChangePassword(true);
            }
        "
        :confirm-loading="loading"
    >
        <a-form
            layout="horizontal"
            :label-col="{ span: 4 }"
            :wrapper-col="{ span: 20 }"
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
                label="Mật khẩu"
                :rules="[{ required: true, message: 'Hãy nhập mật khẩu!' }]"
            >
                <div class="grid grid-cols-10 gap-2">
                    <a-input v-model:value="user.password" :class="props.title === 'Sửa' ? 'col-span-6 lg:col-span-7': 'col-span-10'" :disabled="!changePassword && (props.title === 'Sửa')"/>
                    <a-button type="primary" class="col-span-4 lg:col-span-3" v-if="props.title === 'Sửa'" @click="onChangePassword(false)">
                        Đổi mật khẩu
                    </a-button>
                </div>
                
            </a-form-item>
            <a-form-item label="Vai trò:">
                <a-select ref="select" v-model:value="user.role_id">
                    <a-select-option :value="3"> Sale </a-select-option>
                    <a-select-option :value="4"> Sale VIP </a-select-option>
                    <a-select-option :value="2">Đầu chủ</a-select-option>
                    <a-select-option :value="5"> Đầu chủ VIP </a-select-option>
                    <a-select-option :value="1">Admin</a-select-option>
                </a-select>
            </a-form-item>
            <a-form-item label="Trạng thái:">
                <a-select ref="select" v-model:value="user.is_active">
                    <a-select-option :value="1">Hoạt động</a-select-option>
                    <a-select-option :value="0"
                        >Không hoạt động</a-select-option
                    >
                </a-select>
            </a-form-item>
        </a-form>
    </a-modal>
</template>

<script setup>
import { reactive, ref, watch } from "vue";
import updateUserAPI from "../../../api/users/updateUser";
import createUserAPI from "../../../api/users/createUser";
import messageAnt from "../../../scripts/message";
import { message } from "ant-design-vue";

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
        };
        /**
         * Hàm thêm mới người dùng
         * @param {Object} information
         * CreatedBy: youngbachhh (28/03/2024)
         */
        const fetchCreateUser = async (information) => {
            try {
                await createUserAPI(information);
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

import * as Yup from 'yup'
import isEmail from 'validator/lib/isEmail'
import isMobilePhone from 'validator/lib/isMobilePhone'

export const userRegisterSchema = Yup.object({
  firstName: Yup.string()
    .required('Họ bạn là gì?')
    .min(2, 'Độ dài họ phải từ 2 đến 15 ký tự')
    .max(15, 'Độ dài họ phải từ 2 đến 15 ký tự')
    .test({
      name: 'Does not cotain symbol',
      exclusive: false,
      params: {},
      message: 'Không chứa ký tự đặc biệt',
      test: function (value) {
        const myRegex =
          /^[A-Za-z'"àáảãạăằắẳẵặâầấẩẫậèéẻẽẹêềếểễệòóỏõọồốổỗộơờớởỡợùúủũụưừứửữựìíỉĩịÀÁẢÃẠĂẰẮẲẴẶÂẦẤẨẪẬÈÉẺẼẸÊỀẾỂỄỆÒÓỎÕỌÔỒỐỔỖỘƠỜỚỞỠỢÙÚỦŨỤƯỪỨỬỮỰÌÍỈĨỊ ]+$/
        return myRegex.test(value.toString())
      },
    }),
  lastName: Yup.string()
    .required('Tên bạn là gì?')
    .min(2, 'Độ dài tên phải từ 2 đến 15 ký tự')
    .max(15, 'Độ dài tên phải từ 2 đến 15 ký tự')
    .test({
      name: 'Does not cotain symbol',
      exclusive: false,
      params: {},
      message: 'Không chứa ký tự đặc biệt',
      test: function (value) {
        const myRegex =
          /^[A-Za-z'"àáảãạăằắẳẵặâầấẩẫậèéẻẽẹêềếểễệòóỏõọồốổỗộơờớởỡợùúủũụưừứửữựìíỉĩịÀÁẢÃẠĂẰẮẲẴẶÂẦẤẨẪẬÈÉẺẼẸÊỀẾỂỄỆÒÓỎÕỌÔỒỐỔỖỘƠỜỚỞỠỢÙÚỦŨỤƯỪỨỬỮỰÌÍỈĨỊ ]+$/
        return myRegex.test(value.toString())
      },
    }),
  email: Yup.string()
    .required('Bạn sẽ sử dụng thông tin này khi đăng nhập và khi cần đặt lại mật khẩu')
    .email('Không đúng định dạng email'),
  phoneNumber: Yup.string()
    .required('Bạn sẽ sử dụng thông tin này khi đăng nhập và khi cần đặt lại mật khẩu')
    .test({
      name: 'Phone number pattern',
      exclusive: false,
      params: {},
      message: 'Số điện thoại không đúng dịnh dạng',
      test: function (value) {
        return isMobilePhone(value.toString())
      },
    }),
  password: Yup.string()
    .required('Bạn sẽ sử dụng thông tin này khi đăng nhập')
    .min(6, 'Nhập mật khẩu có tối thiểu 6 ký tự bao gồm số, chữ cái và dấu chấm câu (như ! và &)')
    .max(36, 'Nhập mật khẩu có tối đa 36 ký tự bao gồm số, chữ cái và dấu chấm câu (như ! và &)')
    .test({
      name: 'Password pattern',
      exclusive: false,
      params: {},
      message: 'Nhập mật khẩu có tối đa 36 ký tự bao gồm số, chữ cái và dấu chấm câu (như ! và &)',
      test: function (value) {
        const myRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{6,}$/
        return myRegex.test(value.toString())
      },
    }),
  bDay: Yup.string().required('Vui lòng chọn ngày sinh'),
  bMonth: Yup.string().required('Vui lòng chọn tháng sinh'),
  bYear: Yup.string().required('Vui lòng chọn năm sinh'),
  atLeast13: Yup.string().test({
    name: 'At least 13 years old',
    exclusive: false,
    params: {},
    message: 'Hình như bạn đã nhập sai thông tin. Hãy nhớ dùng ngày sinh nhật thật của mình nhé',
    test: function () {
      const currentDate = new Date()
      const pickedDate = new Date(
        Number(this.parent.bYear),
        Number(this.parent.bMonth),
        Number(this.parent.bDay)
      )
      const atLeast13 = new Date(
        currentDate.getFullYear() - 13,
        currentDate.getMonth(),
        currentDate.getDate()
      )
      return pickedDate < atLeast13
    },
  }),
  noMoreThan70: Yup.string().test({
    name: 'No more than 70 years old',
    exclusive: false,
    params: {},
    message: 'Hình như bạn đã nhập sai thông tin. Hãy nhớ dùng ngày sinh nhật thật của mình nhé',
    test: function () {
      const currentDate = new Date()
      const pickedDate = new Date(
        Number(this.parent.bYear),
        Number(this.parent.bMonth),
        Number(this.parent.bDay)
      )
      const noMoreThan70 = new Date(
        currentDate.getFullYear() - 70,
        currentDate.getMonth(),
        currentDate.getDate()
      )
      return pickedDate > noMoreThan70
    },
  }),
  gender: Yup.string().required('Vui lòng chọn giới tính'),
})

export const userLoginSchema = Yup.object({
  username: Yup.string()
    .required('Email hoặc số điện thoại của bạn là gì?')
    .test({
      name: 'Username pattern',
      exclusive: false,
      params: {},
      message: 'Bạn phải nhập một email hoặc số điện thoại',
      test: function (value) {
        return isEmail(value.toString()) || isMobilePhone(value.toString())
      },
    }),
  password: Yup.string()
    .required('Bạn sẽ sử dụng thông tin này khi đăng nhập')
    .min(6, 'Nhập mật khẩu có tối thiểu 6 ký tự bao gồm số, chữ cái và dấu chấm câu (như ! và &)')
    .max(36, 'Nhập mật khẩu có tối đa 36 ký tự bao gồm số, chữ cái và dấu chấm câu (như ! và &)')
    .test({
      name: 'Password pattern',
      exclusive: false,
      params: {},
      message: 'Nhập mật khẩu có tối đa 36 ký tự bao gồm số, chữ cái và dấu chấm câu (như ! và &)',
      test: function (value) {
        const myRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{6,}$/
        return myRegex.test(value.toString())
      },
    }),
})

export const shippingAddressSchema = Yup.object({
  fullName: Yup.string()
    .required('Họ tên người nhận không được để trống')
    .test({
      name: 'Does not contain symbol',
      exclusive: false,
      params: {},
      message: 'Không chứa ký tự đặc biệt',
      test: function (value) {
        const myRegex =
          /^[A-Za-z'"àáảãạăằắẳẵặâầấẩẫậèéẻẽẹêềếểễệòóỏõọồốổỗộơờớởỡợùúủũụưừứửữựìíỉĩịÀÁẢÃẠĂẰẮẲẴẶÂẦẤẨẪẬÈÉẺẼẸÊỀẾỂỄỆÒÓỎÕỌÔỒỐỔỖỘƠỜỚỞỠỢÙÚỦŨỤƯỪỨỬỮỰÌÍỈĨỊ ]+$/
        return myRegex.test(value.toString())
      },
    }),
  email: Yup.string()
    .required('Bạn sẽ sử dụng thông tin này để cập nhật tình trạng đơn hàng')
    .email('Không đúng định dạng email'),
  phoneNumber: Yup.string()
    .required('Số điện thoại giao hàng không được để trống')
    .test({
      name: 'Phone number pattern',
      exclusive: false,
      params: {},
      message: 'Số điện thoại không đúng dịnh dạng',
      test: function (value) {
        return isMobilePhone(value.toString())
      },
    }),
  address: Yup.string().required('Địa chỉ không được để trống'),
})

export const userUpdateSchema = Yup.object({
  firstName: Yup.string()
    .required('Họ bạn là gì?')
    .min(2, 'Độ dài họ phải từ 2 đến 15 ký tự')
    .max(15, 'Độ dài họ phải từ 2 đến 15 ký tự')
    .test({
      name: 'Does not cotain symbol',
      exclusive: false,
      params: {},
      message: 'Không chứa ký tự đặc biệt',
      test: function (value) {
        const myRegex =
          /^[A-Za-z'"àáảãạăằắẳẵặâầấẩẫậèéẻẽẹêềếểễệòóỏõọồốổỗộơờớởỡợùúủũụưừứửữựìíỉĩịÀÁẢÃẠĂẰẮẲẴẶÂẦẤẨẪẬÈÉẺẼẸÊỀẾỂỄỆÒÓỎÕỌÔỒỐỔỖỘƠỜỚỞỠỢÙÚỦŨỤƯỪỨỬỮỰÌÍỈĨỊ ]+$/
        return myRegex.test(value.toString())
      },
    }),
  lastName: Yup.string()
    .required('Tên bạn là gì?')
    .min(2, 'Độ dài tên phải từ 2 đến 15 ký tự')
    .max(15, 'Độ dài tên phải từ 2 đến 15 ký tự')
    .test({
      name: 'Does not cotain symbol',
      exclusive: false,
      params: {},
      message: 'Không chứa ký tự đặc biệt',
      test: function (value) {
        const myRegex =
          /^[A-Za-z'"àáảãạăằắẳẵặâầấẩẫậèéẻẽẹêềếểễệòóỏõọồốổỗộơờớởỡợùúủũụưừứửữựìíỉĩịÀÁẢÃẠĂẰẮẲẴẶÂẦẤẨẪẬÈÉẺẼẸÊỀẾỂỄỆÒÓỎÕỌÔỒỐỔỖỘƠỜỚỞỠỢÙÚỦŨỤƯỪỨỬỮỰÌÍỈĨỊ ]+$/
        return myRegex.test(value.toString())
      },
    }),
  phoneNumber: Yup.string()
    .required('Bạn sẽ sử dụng thông tin này khi đăng nhập và khi cần đặt lại mật khẩu')
    .test({
      name: 'Phone number pattern',
      exclusive: false,
      params: {},
      message: 'Số điện thoại không đúng dịnh dạng',
      test: function (value) {
        return isMobilePhone(value.toString())
      },
    }),
  bDay: Yup.string().required('Vui lòng chọn ngày sinh'),
  bMonth: Yup.string().required('Vui lòng chọn tháng sinh'),
  bYear: Yup.string().required('Vui lòng chọn năm sinh'),
  atLeast13: Yup.string().test({
    name: 'At least 13 years old',
    exclusive: false,
    params: {},
    message: 'Hình như bạn đã nhập sai thông tin. Hãy nhớ dùng ngày sinh nhật thật của mình nhé',
    test: function () {
      const currentDate = new Date()
      const pickedDate = new Date(
        Number(this.parent.bYear),
        Number(this.parent.bMonth),
        Number(this.parent.bDay)
      )
      const atLeast13 = new Date(
        currentDate.getFullYear() - 13,
        currentDate.getMonth(),
        currentDate.getDate()
      )
      return pickedDate < atLeast13
    },
  }),
  noMoreThan70: Yup.string().test({
    name: 'No more than 70 years old',
    exclusive: false,
    params: {},
    message: 'Hình như bạn đã nhập sai thông tin. Hãy nhớ dùng ngày sinh nhật thật của mình nhé',
    test: function () {
      const currentDate = new Date()
      const pickedDate = new Date(
        Number(this.parent.bYear),
        Number(this.parent.bMonth),
        Number(this.parent.bDay)
      )
      const noMoreThan70 = new Date(
        currentDate.getFullYear() - 70,
        currentDate.getMonth(),
        currentDate.getDate()
      )
      return pickedDate > noMoreThan70
    },
  }),
  gender: Yup.string().required('Vui lòng chọn giới tính'),
})

export const userPasswordSchema = Yup.object({
  oldPassword: Yup.string()
    .required('Mật khẩu cũ của bạn là gì?')
    .min(6, 'Nhập mật khẩu có tối thiểu 6 ký tự bao gồm số, chữ cái và dấu chấm câu (như ! và &)')
    .max(36, 'Nhập mật khẩu có tối đa 36 ký tự bao gồm số, chữ cái và dấu chấm câu (như ! và &)')
    .test({
      name: 'Password pattern',
      exclusive: false,
      params: {},
      message: 'Nhập mật khẩu có tối đa 36 ký tự bao gồm số, chữ cái và dấu chấm câu (như ! và &)',
      test: function (value) {
        const myRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{6,}$/
        return myRegex.test(value.toString())
      },
    }),
  newPassword: Yup.string()
    .required('Bạn phải nhập mật khẩu mới')
    .min(6, 'Nhập mật khẩu có tối thiểu 6 ký tự bao gồm số, chữ cái và dấu chấm câu (như ! và &)')
    .max(36, 'Nhập mật khẩu có tối đa 36 ký tự bao gồm số, chữ cái và dấu chấm câu (như ! và &)')
    .test({
      name: 'Password pattern',
      exclusive: false,
      params: {},
      message:
        'Nhập mật khẩu mới có tối đa 36 ký tự bao gồm số, chữ cái và dấu chấm câu (như ! và &)',
      test: function (value) {
        const myRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{6,}$/
        return myRegex.test(value.toString())
      },
    }),
  confirmPassword: Yup.string()
    .required('Bạn phải xác nhận lại mật khẩu')
    .min(6, 'Nhập mật khẩu có tối thiểu 6 ký tự bao gồm số, chữ cái và dấu chấm câu (như ! và &)')
    .max(36, 'Nhập mật khẩu có tối đa 36 ký tự bao gồm số, chữ cái và dấu chấm câu (như ! và &)')
    .test({
      name: 'Password mismatch',
      exclusive: false,
      params: {},
      message: 'Mật khẩu không khớp',
      test: function (value) {
        return value.toString() === this.parent.newPassword
      },
    }),
})

export const productValidatorSchema = Yup.object({
  name: Yup.string()
    .required('Tên sản phẩm không được để trống')
    .min(5, 'Độ dài sản phẩm ít nhất 5 ký tự')
    .test({
      name: 'Does not cotain symbol',
      exclusive: false,
      params: {},
      message: 'Không chứa ký tự đặc biệt',
      test: function (value) {
        const myRegex =
          /^[A-Za-z0-9'"àáảãạăằắẳẵặâầấẩẫậèéẻẽẹêềếểễệòóỏõọồốổỗộơờớởỡợùúủũụưừứửữựìíỉĩịÀÁẢÃẠĂẰẮẲẴẶÂẦẤẨẪẬÈÉẺẼẸÊỀẾỂỄỆÒÓỎÕỌÔỒỐỔỖỘƠỜỚỞỠỢÙÚỦŨỤƯỪỨỬỮỰÌÍỈĨỊ ]+$/
        return myRegex.test(value.toString())
      },
    }),
  category: Yup.string().required('Loại sản phẩm không được để trống'),
  brand: Yup.string().required('Thương hiệu không được để trống'),
  price: Yup.number()
    .typeError('Giá sản phẩm phải là một số nguyên')
    .required('Giá không được để trống')
    .test({
      name: 'Is number',
      exclusive: false,
      params: {},
      message: 'Giá sản phẩm phải là một số nguyên dương',
      test: function (value) {
        const temp = Number(value)
        return !isNaN(temp) && temp > 0
      },
    }),
  discount: Yup.number()
    .typeError('Tỷ lệ giảm giá phải đúng định dạng')
    .required('Giảm giá không được để trống')
    .test({
      name: 'Is number',
      exclusive: false,
      params: {},
      message: 'Tỷ lệ giảm giá phải là một số nguyên âm có giá trị từ -100% đến 0%',
      test: function (value) {
        const temp = Number(value)
        return !isNaN(temp) && temp <= 0 && temp >= -100
      },
    }),
  countInStock: Yup.number()
    .typeError('Số lượng tồn phải là một số nguyên')
    .required('Số lượng tồn không được để trống')
    .test({
      name: 'Is number',
      exclusive: false,
      params: {},
      message: 'Số lượng tồn phải là một số nguyên dương',
      test: function (value) {
        const temp = Number(value)
        return !isNaN(temp) && temp >= 0
      },
    }),
  description: Yup.string().required('Mô tả không được để trống'),
})

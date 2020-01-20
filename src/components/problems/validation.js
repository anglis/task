import * as Yup from 'yup';

export const validationSchema = Yup.object().shape({
  description: Yup.string().required().max(200),
  actionDescription: Yup.string().required().max(200),
  assignTo: Yup.object().required(),
  status: Yup.string().required(),
})
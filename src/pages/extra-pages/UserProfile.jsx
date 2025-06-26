import { useSelector } from 'react-redux';
import { useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Grid,
  TextField,
  Typography
} from '@mui/material';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import dayjs from 'dayjs';
import { useDispatch } from 'react-redux';
import { updateUser } from 'store/authThunks';

export default function ProfilePage() {
  const user = useSelector((state) => state.auth.user);
  console.log(user);
  const [editMode, setEditMode] = useState(false);
  const formattedDate = dayjs(user?.created_at).format('YYYY-MM-DD HH:mm');

  const initialValues = {
    name: user?.name || '',
    email: user?.email || '',
    role: user?.role || 'UI/UX Designer',
    createdAt:formattedDate || "Today"

  };

const dispatch=useDispatch();
  const handleSubmit = (values) => {
    const { name, email} = values;
    dispatch(updateUser({ name, email}));
  };

  const validationSchema = Yup.object({
    name: Yup.string().required('Required'),
    email: Yup.string().email('Invalid email').required('Required')
  });

//   const handleSubmit = (values) => {
//     console.log('Updated values:', values);
//     // Here you would normally dispatch a redux action or call an API
//     setEditMode(false);
//   };

  return (
    <Box sx={{ maxWidth: 1000, mx: 'auto', mt: 5, px: 2 }}>
      <Card>
        <CardHeader
          title="User Profile"
          action={
            <Button variant="outlined" onClick={() => setEditMode(!editMode)}>
              {editMode ? 'Cancel' : 'Edit'}
            </Button>
          }
        />
        <CardContent>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
            enableReinitialize
          >
            {({ values, errors, touched, handleChange }) => (
              <Form>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Name"
                      name="name"
                      value={values.name}
                      onChange={handleChange}
                      error={touched.name && Boolean(errors.name)}
                      helperText={touched.name && errors.name}
                      InputProps={{ readOnly: !editMode }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Email"
                      name="email"
                      value={values.email}
                      onChange={handleChange}
                      error={touched.email && Boolean(errors.email)}
                      helperText={touched.email && errors.email}
                      InputProps={{ readOnly: !editMode }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Role"
                      name="role"
                      value={values.role}
                      onChange={handleChange}
                      InputProps={{ readOnly: true }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Created at"
                      name="role"
                      value={values.createdAt}
                      onChange={handleChange}
                      InputProps={{ readOnly: true }}
                    />
                  </Grid>
                  {editMode && (
                    <Grid item xs={12} sx={{ textAlign: 'right' }}>
                      <Button type="submit" variant="contained">
                        Save Changes
                      </Button>
                    </Grid>
                  )}
                </Grid>
              </Form>
            )}
          </Formik>
        </CardContent>
      </Card>
    </Box>
  );
}

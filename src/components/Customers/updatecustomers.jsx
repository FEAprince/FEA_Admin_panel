import React, { useCallback, useEffect, useState } from "react";
import { Typography, TextField, Grid, Box } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import {
  customersEditHandlerdata,
  customersHandlerData,
} from "../../service/Auth.Service";
import { useLocation, useNavigate } from "react-router-dom";
import BreadcrumbArea from "../BreadcrumbArea";
import {
  Container,
  InputBox,
  BottomButton,
  ImgBox, ImgSize,
  DelIcon,
} from "./Customers.style";
import { fetchCustomersList } from "../../js/actions";
import { useDispatch } from "react-redux";
import { ENDPOINTURLFORIMG, listBody } from "../../utils/Helper";
import FormHelperText from "@mui/material/FormHelperText";
import DragDrop from "../DragDrop";

export default function UpdateCustomers(props) {
  const [cid, setcid] = useState();
  const location = useLocation();
  const { search } = location;
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState(null);
  const [file, setFile] = useState(null);
  const [apiImg, setApiImg] = useState(null);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  useEffect(() => {
    let userId;
    try {
      if (search.split("=").length > 0) {
        userId = search.split("=")[1];
      } else {
        userId = "";
      }
    } catch (error) {
      alert(error);
    }
    try {
      if (search.split("=").length > 0) {
        userId = search.split("=")[1];
      } else {
        userId = "";
      }
    } catch (error) {
      alert(error);
    }
    try {
      if (userId) {
        getCustomersData(userId);
      }
    } catch (error) {
      alert(error);
    }
    setcid(userId);
    // eslint-disable-next-line
  }, [search]);

  // this function get particular category name and image
  const getCustomersData = async (userId) => {
    const response = await customersHandlerData(userId);
    setApiImg(response.userImg);
    console.log(response)
    try {
      if (response) {
        reset({
          firstName: response.firstName,
          lastName: response.lastName,
          phoneNumber: response.phoneNumber,
          userImg: response.userImg
        });
      }
    } catch (error) {
      alert(error);
    }
  };

  // this function used for after submit form create object and then update functionality this value change from api value
  const { handleSubmit, control, reset, setValue } = useForm({
    defaultValues: {
      firstName: null,
      lastName: null,
      phoneNumber: null,
      userImg: null
    },
  });

  // it can be use for edit categories details


  const handleCustomersData = async (body) => {
    setLoading(true);

    let reqBody;
    try {
      if (file !== null) {
        reqBody = new FormData(); //  if passing an image or file with all data use reBody
        reqBody.append("firstName", body.firstName);
        reqBody.append("lastName", body.lastName);
        reqBody.append("phoneNumber", body.phoneNumber);
        reqBody.append("userImg", file);
      } else {
        // if not passing any imge or file pass  data normally like Body
        reqBody = {
          firstName: body.firstName,
          lastName: body.lastName,
          phoneNumber: body.phoneNumber,
          userImg: apiImg,
        };
      }
    } catch (error) {
      alert(error);
    }
    const response = await customersEditHandlerdata(cid, reqBody);
    try {
      if (response.success) {
        navigate(`/customers`);
        dispatch(
          fetchCustomersList(listBody({ where: null, perPage: 10, page: 1 }))
        );
        setLoading(false);
        props.getValue(true, `${response.message}`);
      }
    } catch (error) {
      alert(error);
    }

  };

  const onDrop = useCallback((acceptedFiles) => {
    acceptedFiles.map((file) => {
      setFile(file);
      setValue("userImg", file);
      const reader = new FileReader();
      reader.onload = function (e) {
        setImages(e.target.result);
      };
      reader.readAsDataURL(file);
      return file;
    }); // eslint-disable-next-line
  }, []);

  return (
    <Container>
      <BreadcrumbArea />
      <Grid container>
        <InputBox xs={3}>

          <Grid container spacing={2}>
            <Grid xs={4}>

            </Grid>
            <Grid xs={6}>
              <Typography variant="subtitle1" >
                Profile Image
              </Typography>
            </Grid>
            <Grid xs={1}>

            </Grid>
          </Grid>

          <ImgBox>
            <Controller
              name="userImg"
              render={({ field: { value }, fieldState: { error } }) => (
                <>
                  {images == null ? (
                    <Box>
                      <FormHelperText error={error}>
                        {error?.message ?? ""}
                      </FormHelperText>
                      <Grid container spacing={2}>
                        {value == null ? (
                          <Grid item xs={12}>
                            <DragDrop onDrop={onDrop} accept={"image/*"} />
                          </Grid>
                        ) : (
                          <></>
                        )}

                        {value !== null ? (
                          <Grid item xs={11}>
                            <ImgSize
                              component="img"
                              src={ENDPOINTURLFORIMG + value}
                              alt=""
                            />
                          </Grid>
                        ) : (
                          <></>
                        )}
                        {value !== null ? (
                          <Grid item xs={1}>
                            <DelIcon
                              onClick={() => [
                                setImages(null),
                                setValue("userImg", null),
                              ]}
                            />
                          </Grid>
                        ) : (
                          <></>
                        )}
                      </Grid>

                    </Box>
                  ) : (
                    <>
                      <Grid container spacing={2}>
                        <Grid item xs={6}>
                          {images == null ? (
                            <DragDrop onDrop={onDrop} accept={"image/*"} />
                          ) : (
                            <></>
                          )}
                        </Grid>
                        <Grid item xs={11}>
                          <ImgSize component="img" src={images} alt="" /></Grid>

                        {images !== null ? (
                          <Grid item xs={1}>
                            <DelIcon
                              onClick={() => [
                                setImages(null),
                                setValue("userImg", null),
                              ]}
                            />
                          </Grid>
                        ) : (
                          <></>
                        )}

                      </Grid>
                    </>
                  )}
                </>
              )}
              control={control}
              rules={{
                required: {
                  value: " ",
                  message: "Upload Profile image",
                },
              }}
            />
          </ImgBox>
        </InputBox>
        <Grid xs={8}>
          <InputBox>
            <Typography color="text.primary" variant="subtitle2">
              First Name
            </Typography>
            <Controller
              name="firstName"
              render={({ field: { onChange, value }, fieldState: { error } }) => (
                <TextField
                  margin="normal"
                  fullWidth
                  id="firstName"
                  placeholder="First Name"
                  name="firstName"
                  value={value}
                  onChange={onChange}
                  error={!!error}
                  helperText={error?.message ?? ""}
                />
              )}
              control={control}
              rules={{
                required: "Please add first name",
              }}
            />
            <Typography color="text.primary" variant="subtitle2">
              Last Name
            </Typography>
            <Controller
              name="lastName"
              render={({ field: { onChange, value }, fieldState: { error } }) => (
                <TextField
                  margin="normal"
                  fullWidth
                  id="lastName"
                  placeholder="Last Name"
                  name="lastName"
                  value={value}
                  onChange={onChange}
                  error={!!error}
                  helperText={error?.message ?? ""}
                />
              )}
              control={control}
              rules={{
                required: "Please add last name",
              }}
            />
            <Typography color="text.primary" variant="subtitle2">
              Phone no
            </Typography>
            <Controller
              name="phoneNumber"
              render={({ field: { onChange, value }, fieldState: { error } }) => (
                <TextField
                  margin="normal"
                  fullWidth
                  id="phoneNumber"
                  placeholder="Phone no"
                  name="phoneNumber"
                  value={value}
                  onChange={onChange}
                  error={!!error}
                  helperText={error?.message ?? ""}
                />
              )}
              control={control}
              rules={{
                required: "Please add phone number",
              }}
            />
            <br />

            <BottomButton
              type="submit"
              loading={loading}
              loadingPosition="end"
              variant="contained"
              onClick={handleSubmit(handleCustomersData)}
            >
              {cid ? "Update" : "Add"} Customers
            </BottomButton>
            <BottomButton
              variant="contained"
              onClick={() => navigate("/customers")}
            >
              Back
            </BottomButton>
          </InputBox>
        </Grid>
      </Grid>



    </Container>
  );
}

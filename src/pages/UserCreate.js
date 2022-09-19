import React, { useEffect, useMemo, useState } from 'react';
import { isString } from 'lodash';
import { useParams, useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import UserCreateForm from '../modules/user/UserCreateForm';
import { routesString } from '../constants/config';
import API from '../api';
import config from '../api/config';
import { uploadFiles } from '../api/actions/upload-file';

const UserCreate = () => {
  const navigate = useNavigate();

  const { id } = useParams();
  // const { enqueueSnackbar } = useSnackbar();

  const [isLoading, setIsLoading] = useState(!!id);
  const [data, setData] = useState(null);
  const [currentAreaItems, setCurrentAreaItems] = useState([]);
  const [upgradeItems, setUpgradeItems] = useState([]);

  // useEffect(() => {
  //   (async () => {
  //     await fetchAreaItems();
  //     await fetchSpinItems();
  //     if (id) {
  //       const areaItem = await fetchAreaItemById(id);

  //       setData(areaItem);
  //     }

  //     setIsLoading(false);
  //   })();
  // }, [id]);

  // const fetchAreaItems = async () => {
  //   const areaItems = await fetchAreaItemsAction();

  //   setCurrentAreaItems(areaItems);
  // };

  // const fetchSpinItems = async () => {
  //   const spinItems = await fetchSpinAction();

  //   const filteredData = spinItems.data
  //     .filter((ele) => ele?.type === SpinItemType.MATERIAL_BUILDER)
  //     .map((ele) => ({ value: ele._id, label: ele.name }));

  //   setUpgradeItems(filteredData);
  // };

  const handleSave = async (data) => {
    try {
      const { avatarImage } = data;
      console.log(typeof avatarImage);
      const url = await uploadFiles(avatarImage);
      console.log(url, 123);
      
      //     const populatedData = {
      //       ...data,
      //       details: updatedDetails.map((ele, idx) => ({
      //         ...ele,
      //         level: idx + 1,
      //       })),
      //     };

      //     await (id ? updateAreaItemAction(id, populatedData) : createAreaItemAction(populatedData));

      //     enqueueSnackbar('Successfully!', {
      //       variant: 'success',
      //     });
      //     navigate(routesString.AREA_ITEMS);
    } catch (error) {
      // enqueueSnackbar(error.response.data.errors || error.response.data.message || error.message, {
      //   variant: 'error',
      // });
    }
  };

  const initialValues = useMemo(
    () => ({
      name: '',
      phone: '',
      userName: '',
      password: '',
      repassword: '',
      role: '',
      avatar: '',
    }),
    []
  );
  return isLoading ? (
    <div>Loading...</div>
  ) : (
    <UserCreateForm
      upgradeItems={upgradeItems}
      currentAreaItems={currentAreaItems}
      onSubmit={handleSave}
      id={id}
      initialValues={initialValues}
    />
  );
};

export default UserCreate;

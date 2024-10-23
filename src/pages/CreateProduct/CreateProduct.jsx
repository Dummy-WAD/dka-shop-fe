import { Link, useNavigate } from "react-router-dom";
import {  handleCreateProduct } from "../../api/product";
import { useEffect, useRef, useState } from "react";
import {
  Button,
  Grid2,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import {
  AddOutlined,
  ArrowBack,
  CheckBox,
  Done,
  EditOutlined,
  RemoveCircleOutline,
} from "@mui/icons-material";
import classes from "./CreateProduct.module.css";
import { toast } from "react-toastify";
import SelectCustom from "../../components/SelectCustom/SelectCustom";
import MyTextField from "../../components/MyTextField/MyTextField";
import { v4 as uuidv4 } from "uuid";
import { useBoolean } from "../../hook/useBoolean";
import ModalCustom from "../../components/Modal/BasicModal";
import { getAllCategoriesInCustomer } from "../../api/category";
import CreateVariantModal from "./CreateVariantModal";
import EditVariantModal from "./EditVariantModal";
import { getPresignedURLs, uploadImagesToS3 } from "../../api/image";
import classNames from "classnames";

const getUniqueFileName = (file) => {
  const extension = file.name.split(".").pop();
  const fileName = file.name.replace(`.${extension}`, "");
  return `${fileName}_${uuidv4()}.${extension}`;
};

const CreateProduct = () => {
  const navigate = useNavigate();
  const createVariantModal = useBoolean();
  const editVariantModal = useBoolean();
  const [categoriesList, setCategoriesList] = useState([]);
  const [currentVariant, setCurrentVariant] = useState(null);
  const [variantList, setVariantList] = useState([]);
  const [images, setImages] = useState([]);
  const nameRef = useRef("");
  const categoryRef = useRef("");
  const priceRef = useRef("");
  const descriptionRef = useRef("");

  const handleSubmit = () => {
    const name = nameRef.current.value.trim();
    const category = categoryRef.current.value;
    const price = priceRef.current.value.trim();
    const description = descriptionRef.current.value.trim();
    if (!name || !category || !price || !description) {
      toast.error("Please fill in all the information", {
        autoClose: 3000,
      });
      return;
    }
    if (isNaN(price) || isNaN(parseFloat(price))) {
      toast.error("Price must be a number", {
        autoClose: 3000,
      });
      return;
    }
    if (variantList.length === 0) {
      toast.error("There must be at least one variant", {
        autoClose: 3000,
      });
      return;
    }
    if (images.length === 0) {
      toast.error("There must be at least one image", {
        autoClose: 3000,
      });
      return;
    }

    const CreateProduct = async () => {
      try {
        const fileNames = images.map((item) => item.id);
        const files = images.map((item) => item.file);
        const { urls } = await getPresignedURLs(fileNames);
        await uploadImagesToS3(urls, files);
        const params = {
          name,
          price,
          description,
          categoryId: category,
          productImages: images.map(({ id, isPrimary }) => ({
            filename: id,
            isPrimary,
          })),
          productVariants: variantList.map(({ size, color, quantity }) => ({
            size,
            color,
            quantity: parseInt(quantity),
          })),
        };
        await handleCreateProduct(params)
        navigate("/admin/product")
      } catch (err) {
        toast.error(err.response.data.message, { autoClose: 3000 });
      }
    };
    CreateProduct();
  };

  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files);
    const newImages = files.map((file) => {
      const newFileName = getUniqueFileName(file);
      const newFile = new File([file], newFileName, {
        type: file.type,
        lastModified: file.lastModified,
      });
      return {
        id: newFileName,
        file: newFile,
        src: URL.createObjectURL(newFile),
        isPrimary: false,
      };
    });
    setImages((prevImages) => {
      const updatedImages = [...prevImages, ...newImages];
      if (!updatedImages.some((img) => img.isPrimary)) {
        updatedImages[0].isPrimary = true;
      }
      return updatedImages;
    });
  };

  const handleRemoveImage = (id) => {
    setImages((prevImages) => {
      let check = false;
      const updatedImages = prevImages.filter((img) => {
        if (img.id === id && img.isPrimary) check = true;
        return img.id !== id;
      });
      if (check && updatedImages.length > 0) {
        updatedImages[0].isPrimary = true;
      }
      return updatedImages;
    });
  };

  const handleMarkPrimary = (id) => {
    const updatedImages = images.map((img) =>
      img.id === id ? { ...img, isPrimary: true } : { ...img, isPrimary: false }
    );
    setImages(updatedImages);
  };

  const handleRemoveVariant = (id) => {
    const updatedVariants = variantList.filter((row) => row.id !== id);
    setVariantList(updatedVariants);
  };

  const handleOpenEditVariantModal = (item) => {
    setCurrentVariant(item);
    editVariantModal.setTrue();
  };

  const handleCreateVariant = (item) => {
    const { size, color, quantity } = item;
    setVariantList((prev) => [
      ...prev,
      { id: uuidv4(), size, color, quantity },
    ]);
    createVariantModal.setFalse();
  };

  const handleEditVariant = (item) => {
    setVariantList(
      variantList.map((variant) =>
        variant.id === item.id ? { ...variant, ...item } : variant
      )
    );
    editVariantModal.setFalse();
  };

  useEffect(() => {
    const getCategories = async () => {
      try {
        const res = await getAllCategoriesInCustomer();
        setCategoriesList(
          res.map(({ id, name }) => ({ key: id, value: name }))
        );
      } catch (err) {
        toast.error(err.response.data.message, {
          autoClose: 3000,
        });
      }
    };
    getCategories();
  }, []);

  return (
    <div>
      <div>
        <Link to="/admin/product">
          <Button
            sx={{ backgroundColor: "var(--admin-color)", color: "#fff" }}
            variant="contained"
            startIcon={<ArrowBack />}
          >
            Back
          </Button>
        </Link>
        <Typography
          variant="h5"
          sx={{ textAlign: "center", mt: "-2rem", fontWeight: 600 }}
        >
          Create Product
        </Typography>
      </div>
      <div className={classes.container}>
        <div className={classes.container_in4}>
          <div className={classes.row}>
            <MyTextField
              id="name"
              ref={nameRef}
              label="Name"
              variant="outlined"
              color="var(--admin-color)"
              style={{ mb: "1.5rem", width: "100%" }}
            />
          </div>
          <div className={classes.row}>
            <Grid2 sx={{ width: "30%" }}>
              <SelectCustom
                ref={categoryRef}
                label="Category"
                menuList={categoriesList}
                style={{
                  width: "100%",
                  mb: "1.5rem",
                }}
              />
              <MyTextField
                id="price"
                ref={priceRef}
                label="Price"
                variant="outlined"
                color="var(--admin-color)"
                style={{ mb: "1.5rem", width: "100%" }}
              />
            </Grid2>
            <Grid2 sx={{ width: "70%" }}>
              <MyTextField
                id="description"
                label="Description"
                ref={descriptionRef}
                variant="outlined"
                multiline
                rows={5}
                color="var(--admin-color)"
                style={{ width: "100%" }}
              />
            </Grid2>
          </div>
        </div>
        <div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "1rem",
            }}
          >
            <Typography sx={{ fontWeight: "600", fontSize: "20px" }}>
              List variants
            </Typography>
            <Button
              sx={{ backgroundColor: "var(--admin-color)", color: "#fff" }}
              variant="contained"
              startIcon={<AddOutlined />}
              onClick={createVariantModal.setTrue}
            >
              Create variant
            </Button>
          </div>
          <div className={classes.row}>
            <TableContainer
              className={classes.container}
              sx={{
                border: "1px solid rgba(224, 224, 224, 1)",
                borderRadius: "5px",
              }}
            >
              <Table>
                <TableHead className={classes.table_head}>
                  <TableRow>
                    <TableCell sx={{ color: "#FFF", fontWeight: "bold" }}>
                      Size
                    </TableCell>
                    <TableCell sx={{ color: "#FFF", fontWeight: "bold" }}>
                      Color
                    </TableCell>
                    <TableCell sx={{ color: "#FFF", fontWeight: "bold" }}>
                      Quantity
                    </TableCell>
                    <TableCell width={80}></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {variantList?.map((item) => {
                    const { id, size, color, quantity } = item;
                    return (
                      <TableRow key={id} className={classes.table_row}>
                        <TableCell>{size}</TableCell>
                        <TableCell>{color}</TableCell>
                        <TableCell>{quantity}</TableCell>
                        <TableCell
                          sx={{
                            paddingRight: "1rem",
                            display: "flex",
                            gap: "2rem",
                            justifyContent: "flex-center",
                          }}
                        >
                          <EditOutlined
                            className={classes.variantIcon}
                            onClick={() => handleOpenEditVariantModal(item)}
                          />
                          <RemoveCircleOutline
                            className={classes.variantIcon}
                            onClick={() => handleRemoveVariant(id)}
                          />
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </div>
      </div>
      <div className={classes.container}>
        <Typography sx={{ fontWeight: "600", fontSize: "20px" }}>
          List images
        </Typography>
        <div className={classes.imageContainer}>
          {images.map((image) => (
            <div
              key={image.id}
              style={{ position: "relative", width: 250, height: 250 }}
              onMouseEnter={(e) => {
                e.currentTarget.querySelector(".hover").style.display =
                  "flex";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.querySelector(".hover").style.display =
                  "none";
              }}
            >
              <img
                src={image.src}
                alt={`uploaded-${image.name}`}
                className={classes.productImage}
              />

              {image.isPrimary && (
                <CheckBox className={classes.primaryImageIcon} />
              )}

              <div className={classNames(classes.hoverImage, "hover")}>
                <Button
                  className={classes.imgButton}
                  sx={{ backgroundColor: "var(--admin-color)", color: "#fff" }}
                  variant="contained"
                  onClick={() => handleMarkPrimary(image.id)}
                >
                  Primary
                </Button>
                <Button
                  className={classes.imgButton}
                  sx={{ backgroundColor: "var(--admin-color)", color: "#fff" }}
                  variant="contained"
                  onClick={() => handleRemoveImage(image.id)}
                >
                  Delete
                </Button>
              </div>
            </div>
          ))}

          <label
            htmlFor="file-upload"
            className={classes.uploadContainer}
          >
            <div
              className={classes.uploadContent}
            >
              <span style={{ fontSize: "24px", color: "#ccc" }}>+</span>
              <span style={{ color: "#ccc" }}>Add photo</span>
            </div>
          </label>
          <input
            id="file-upload"
            type="file"
            multiple
            accept="image/*"
            style={{ display: "none" }}
            onChange={handleImageUpload}
          />
        </div>
      </div>
      <div className={classes.action_buttons}>
        <Button
          sx={{ backgroundColor: "var(--admin-color)", color: "#fff" }}
          variant="contained"
          startIcon={<Done />}
          onClick={() => handleSubmit()}
        >
          Save
        </Button>
      </div>
      <ModalCustom
        isOpen={createVariantModal.value}
        handleClose={createVariantModal.setFalse}
      >
        <CreateVariantModal
          variantList={variantList}
          onCreateVariant={handleCreateVariant}
        />
      </ModalCustom>
      <ModalCustom
        isOpen={editVariantModal.value}
        handleClose={editVariantModal.setFalse}
      >
        <EditVariantModal
          variant={currentVariant}
          variantList={variantList}
          onEditVariant={handleEditVariant}
        />
      </ModalCustom>
    </div>
  );
};

export default CreateProduct;

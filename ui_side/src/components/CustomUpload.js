import { Upload, message, Avatar } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import {useSelector,useDispatch} from 'react-redux'


const CustomUpload = ({ onChange, avatar }) => {

  const {user} = useSelector(state=> state.user);

  const customRequest = async ({ file, onSuccess, onError }) => {
    try {
      const reader = new FileReader();

      reader.onload = () => {
        onChange(reader.result);
      };

      reader.readAsDataURL(file);

      // Here you can implement the logic to upload the file to your server or Cloudinary
      // For simplicity, let's assume a successful upload after a short delay
      setTimeout(() => {
        onSuccess();
        message.success(`${file.name} file uploaded successfully`);
      }, 1000);
    } catch (error) {
      onError(error);
      message.error(`${file.name} file upload failed.`);
    }
  };

  return (
    <Upload
      customRequest={customRequest}
      showUploadList={false}
      accept="image/*"
    >
      {avatar ? (
        <>
        <img src={avatar} alt="Avatar" style={{ width: '100px', height: '100px', borderRadius: '50%' }} />
        <div style={{display:'flex', justifyContent:'center'}}>
          <UploadOutlined />
          </div >
          <div style={{display:'flex', justifyContent:'center'}}> <b> Set Avatar </b> </div>
        </>
      ) : (
        <div>
          <Avatar size={100} style={{backgroundColor:'fireBrick'}}>
                  <img src={user.avatar?.url} alt={user.name.split(' ')[0]} />
          </Avatar>
          <div style={{display:'flex', justifyContent:'center', color:'crimson'}}>
          <UploadOutlined />
          </div >
          <div style={{display:'flex', justifyContent:'center', color:'crimson'}}><b> Set Avatar </b></div>
        </div>
      )}
    </Upload>
  );
};

export default CustomUpload;

import { Alert, Avatar, Box, Grid, Link, Paper, TextField, Typography } from '@mui/material'
import LoadingButton from '@mui/lab/LoadingButton';
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { teal } from "@mui/material/colors";
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { basicSignin, login } from '../../firebase/auth';
import { useOpenSnackbar } from '../../hooks/useSetSnackbar';
import { useSetSnackbarMessage } from '../../hooks/useSnackbarMessage';

export const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [load, setLoad] = useState(false);
  const navigate = useNavigate();
  const { openBar } = useOpenSnackbar();
  const { setMessage } = useSetSnackbarMessage();

  /**
   * ログイン処理
   */
  const handleLogin = async () => {
    setLoad(true);
    try {
      await login(email, password);
      openBar();
      setMessage("ログイン成功");
      setLoad(false);
      navigate("/bookManagement");
    } catch (e) {
      const error = e as Error
      setMessage(error.message);
      openBar();
      setLoad(false);
    }

  }
  return (
    <div>
      <Paper
        elevation={3}
        sx={{
          p: 4,
          height: "70vh",
          width: "280px",
          m: "20px auto" // 中央寄せ
        }}
      >
        <Grid
          container
          direction="column"
          alignItems="center"
        >
          {/* アイコン */}
          <Avatar sx={{ bgcolor: teal[400] }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography variant={"h5"} sx={{ m: "30px" }}>
            Login
          </Typography>
        </Grid>
        <Box mt={3}>
          {/* テキストフィールド */}
          <TextField label="メールアドレス" fullWidth onChange={({ target: { value } }) => setEmail(value)} />
          <TextField label="パスワード" fullWidth margin="normal" onChange={({ target: { value } }) => setPassword(value)} />
          <Box mt={3}>
            {/* サインインボタン */}
            <LoadingButton type="submit" color="primary" variant="contained" loading={load} loadingIndicator="ログイン中・・・" fullWidth onClick={handleLogin}>
              ログイン
            </LoadingButton>
            <Typography variant="caption">
              <Link href="#">パスワードを忘れましたか？</Link>
            </Typography>
            <Typography variant="caption" display="block">
              アカウントを持っていますか？
              <Link href="#">アカウントを作成</Link>
            </Typography>
          </Box>
        </Box>
      </Paper>
    </div>
  )
}

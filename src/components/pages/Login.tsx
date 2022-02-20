import { Avatar, Box, Grid, Link, Paper, Stack, TextField, Typography } from '@mui/material'
import LoadingButton from '@mui/lab/LoadingButton';
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { teal } from "@mui/material/colors";
import { useInput } from '../../hooks/useInput';
import { useLogin } from '../../hooks/useLogin';
import { useOpenSnackbar } from '../../hooks/useSetSnackbarState';
import { G_MSG_001, G_MSG_002, SEVERITY } from '../../constants/constants';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { anonymouslyLogin } from '../../firebase/auth';

export const Login: React.FC = () => {
  // state
  const [email, setEmail] = useInput();
  const [password, setPassword] = useInput();
  const { load, login } = useLogin();
  const { openSnackbar } = useOpenSnackbar();

  // router
  const navigate = useNavigate();

  /**
   * ログイン処理
   */
  const handleLogin = async () => {
    try {
      await login(email, password);
      openSnackbar(G_MSG_001, SEVERITY.SUCCESS);
      navigate("/bookManagement")
    } catch (e) {
      const error = e as Error
      openSnackbar(error.message, SEVERITY.ERROR);
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
          <TextField label="メールアドレス" value={email} type="text" fullWidth onChange={({ target: { value } }) => setEmail(value)} />
          {/* TODO:パスワードの表示非表示 */}
          <TextField label="パスワード" value={password} type="password" fullWidth margin="normal" onChange={({ target: { value } }) => setPassword(value)} />
          <Stack spacing={2} mt={3}>
            {/* サインインボタン */}
            <LoadingButton type="submit" color="primary" variant="contained" loading={load} fullWidth onClick={handleLogin}>
              ログイン
            </LoadingButton>
            <Typography variant="caption" display="block" >
              <RouterLink to="/signin">アカウントを作成</RouterLink>
            </Typography>
          </Stack>
        </Box>
      </Paper>
    </div>
  )
}

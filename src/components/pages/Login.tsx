import { Avatar, Box, Grid, Link, Paper, TextField, Typography } from '@mui/material'
import LoadingButton from '@mui/lab/LoadingButton';
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { teal } from "@mui/material/colors";
import { useInput } from '../../hooks/useInput';
import { useLogin } from '../../hooks/useLogin';

export const Login: React.FC = () => {
  // state
  const { input: email, changeInput: setEmail } = useInput();
  const { input: password, changeInput: setPassword } = useInput();
  const { load, login } = useLogin();

  /**
   * ログイン処理
   */
  const handleLogin = () => {
    login(email, password)
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
            <LoadingButton type="submit" color="primary" variant="contained" loading={load} fullWidth onClick={handleLogin}>
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

import { Avatar, Box, Button, Grid, Link, Paper, TextField, Typography } from '@mui/material'
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { teal } from "@mui/material/colors";
import { useNavigate } from 'react-router-dom';

export const Login = () => {
  const navigate = useNavigate();
  const handleLogin = () => {
    navigate("/");
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
          <TextField label="メールアドレス" fullWidth />
          <TextField label="パスワード" fullWidth margin="normal" />
          {/* サインインボタン */}
          <Button type="submit" color="primary" variant="contained" fullWidth onClick={handleLogin}>
            ログイン
          </Button>
          <Typography variant="caption">
            <Link href="#">パスワードを忘れましたか？</Link>
          </Typography>
          <Typography variant="caption" display="block">
            アカウントを持っていますか？
            <Link href="#">アカウントを作成</Link>
          </Typography>
        </Box>
      </Paper>
    </div>
  )
}

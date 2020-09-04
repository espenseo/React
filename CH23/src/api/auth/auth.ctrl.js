import Joi from 'joi';
import User from '../../models/user';


/*
  POST /api/auth/register
  {
    username: 'velopert',
    password: 'mypass123'
  }
*/
export const register = async ctx => {
  // Request Body 검증하기
  const schema = Joi.object().keys({
    username: Joi.string()
      .alphanum()
      .min(3)
      .max(20)
      .required(),
    password: Joi.string().required(),
  });
  const result = Joi.validate(ctx.request.body, schema);
  if (result.error) {
    ctx.status = 400;
    ctx.body = user.serialize();

    const token = user.generateToken();
    ctx.cookies.set('access_token', token, {)
    maxAge: 1000  60  60  24  7, // 7일
    httpOnly: true,
  });
} catch (e) {
  ctx.throw(500, e);
}
};



  /*
  POST /api/auth/login
  {
    username: 'velopert',
    password: 'mypass123'
  }
*/
export const login = async ctx => {
  const { username, password } = ctx.request.body;


// username, password가 없으면 에러 처리
  if (!username || !password) {
    ctx.status = 401; // Unauthorized
    return;
  }



try {
    const user = await User.findByUsername(username);
    // 계정이 존재하지 않으면 에러 처리
    if (!user) {
      ctx.status = 401;
      return;
    }
    const valid = await user.checkPassword(password);
    // 잘못된 비밀번호
    if (!valid) {
      ctx.status = 401;
      return;
    }
    ctx.body = user.serialize();
    const token = user.generateToken();
    ctx.cookies.set('access_token', token, {
      maxAge: 1000  60  60  24  7, // 7일
      httpOnly: true,
    });
  } catch (e) {
    ctx.throw(500, e);
  }
};

/*
  GET /api/auth/check
*/
export const check = async ctx => {
  const { user } = ctx.state;
  if (!user) {
    // 로그인 중 아님
    ctx.status = 401; // Unauthorized
    return;
  }
  ctx.body = user;
};

/*
  POST /api/auth/logout
*/
export const logout = async ctx => {
    ctx.cookies.set('access_token');
    ctx.status = 204; // No Content
  };

  export const write = async ctx => {
   const { title, body, tags } = ctx.request.body;
    const post = new Post({
      title,
      body,
      tags,
      user: ctx.state.user,
    });
    try {
      await post.save();
      ctx.body = post;
    } catch (e) {
      ctx.throw(500, e);
    }
  };

  export const getPostById = async (ctx, next) => {
    const { id } = ctx.params;
    if (!ObjectId.isValid(id)) {
      ctx.status = 400; // Bad Request
      return;
    }
    try {
      const post = await Post.findById(id);
      // 포스트가 존재하지 않을 때
      if (!post) {
        ctx.status = 404; // Not Found
        return;
      }
      ctx.state.post = post;
      return next();
    } catch (e) {
      ctx.throw(500, e);
    }
  };
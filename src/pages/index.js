import React ,{useState ,useEffect} from 'react'
import PropTypes from 'prop-types'
import hljs from 'highlight.js';
import {Link} from 'gatsby'
import marked from 'marked'
import Navbar from '../components/Navbar'
import Img from 'gatsby-image'
import logo from '../img/logo.svg'
import Quote from '../components/Quote'
import Layout from '../components/Layout'

import axios from "axios"

const rawMarkup= (item)=>{
 
  if( typeof item == "undefined") return 
  marked.setOptions({
    renderer: new marked.Renderer(),
    gfm: true,
    tables: true,
    breaks: true,
    pedantic: false,
    sanitize: true,
    smartLists: true,
    smartypants: false,
    highlight: function(code) {
      return hljs.highlightAuto(code).value;
    }
  });
  
  var rawMarkup = marked( item ? item :null)
  return { __html: rawMarkup }
}

const getBlogList = ()=>{
  return axios.post("/api/blog/list",{
    firstname:"lisi",
    lastname:"张三"
  })
}
const getBlogNum = ()=>{
  return axios.post("/api/blog/num",{})
}


const  useGetBlog = ()=>{
  const [loading, setLoading] = useState(true);
  const [blog, setBlog] = useState({});
  const [num,setNum]  = useState({})
  useEffect(()=>{
    axios.all([getBlogList(),getBlogNum()])
    .then(axios.spread((res1,res2)=>{
      setLoading(false)
      setBlog(res1.data.data.content)
      setNum(res2.data.data)
      
    }))
    .catch(err=>{
      console.log("err",err)
    })
  },[])
  return [loading, blog,num];
}

const IndexPage = () => { 
  const [loading,blog,num] = useGetBlog()

  if(loading){
    return<div>loading</div>
  }

  return(
    <Layout>
      <section className="hero has-gatsby-img">
        <img className="index-logo-bg" src={require("../img/hero.jpg")}  />
        <div className="hero-head">
          <Navbar />
        </div>

        <div className="hero-body has-text-centered">
          <div className="container">
            <img
              style={{ width: '55vmin', height: '55vmin' }}
              src={logo}
              alt="CRIMX LOGO"
            />
          </div>
        </div>

        <div className="hero-foot has-text-centered">
          <svg viewBox="0 0 32 32" width="32" height="32">
            <title>scroll down</title>
            <path
              fill="#fff"
              d="M.045 8.443c0-.215.082-.43.246-.594.33-.33.86-.33 1.19 0L16 22.37 30.52 7.85c.33-.33.86-.33 1.19 0s.327.86 0 1.186L16.593 24.152c-.328.326-.86.326-1.188 0L.29 9.036c-.163-.163-.245-.378-.245-.593z"
            />
          </svg>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <Quote
            quote={{
              content: `"How do you know I'm mad?" said Alice.\n"You must be," said the Cat, "or you wouldn't have come here."`,
              author: `Lewis Carroll`,
              source: `Alice's Adventures in Wonderland`,
            }}
          />
        </div>
      </section>
      <section className="section">
        <div className="container has-text-centered">
          <div className="content">
            <p>
              欢迎光临本博客！这里主要是记录 Web
              前端相关的一些文章，偶尔涉及其它我感兴趣的东西。
            </p>
          </div>
          <div className="columns">
            <div className="column">
              <Link
                className="has-text-dark is-block"
                to="/archives1?search=%23JavaScript"
              >
                <div className="box has-background-light">
                  <h2 className="heading">{num.js} 篇文章</h2>
                  <h1 className="title">JAVASCRIPT</h1>
                </div>
              </Link>
            </div>
            <div className="column">
              <Link
                className="has-text-dark is-block"
                to="/archives1?search=%23闲读源码"
              >
                <div className="box has-background-light">
                  <h2 className="heading">{num.code} 篇文章</h2>
                  <h1 className="title">闲读源码</h1>
                </div>
              </Link>
            </div>
            <div className="column">
              <Link
                className="has-text-dark is-block"
                to="/archives1?search=%23闲读规范"
              >
                <div className="box has-background-light">
                  <h2 className="heading">{num.eslint} 篇文章</h2>
                  <h1 className="title">闲读规范</h1>
                </div>
              </Link>
            </div>
            <div className="column">
              <Link className="has-text-dark is-block" to="/archives">
                <div className="box has-background-light">
                  <h2 className="heading">{num.all} 篇文章</h2>
                  <h1 className="title">全部博文</h1>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <div className="content">
            <p className="has-text-centered">最近文章：</p>
            {blog.length !== undefined ? blog.map((post)=>{

              return<div className="box" key={post.id}>
                <p>
                  <Link className="is-link-reverse" to={post.slug}>
                    <strong>{post.title}</strong>
                  </Link>
                  <span> &bull; </span>
                  <small>{post.date}</small>
                </p>
                <p>{post.description}</p>
                <p>
                  <Link className="button is-small" to={post.slug}>
                    继续阅读 →
                  </Link>
                </p>
              </div>
            }):null}
          </div>
          <Link
            className="button has-text-weight-light is-medium is-light is-fullwidth"
            to="/archives"
          >
            查看全部文章
          </Link>
        </div>
      </section>
      
    

      {/* <div dangerouslySetInnerHTML = {rawMarkup(blog.content)}></div> */}
    </Layout>
  )

  
}



export default IndexPage

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const urls = {
  "python.png": "https://img.icons8.com/color/480/python.png",
  "sql.png": "https://img.icons8.com/color/480/sql.png",
  "cpp.png": "https://img.icons8.com/color/480/c-plus-plus-logo.png",
  "tensorflow.png": "https://img.icons8.com/color/480/tensorflow.png",
  "pytorch.png": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/PyTorch_logo_icon.svg/1200px-PyTorch_logo_icon.svg.png",
  "scikit-learn.png": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Scikit_learn_logo_small.svg/1200px-Scikit_learn_logo_small.svg.png",
  "pandas.png": "https://img.icons8.com/color/480/pandas.png",
  "numpy.png": "https://img.icons8.com/color/480/numpy.png",
  "fastapi.png": "https://img.icons8.com/fluency/480/api.png",
  "flask.png": "https://img.icons8.com/color/480/flask.png",
  "langchain.png": "https://avatars.githubusercontent.com/u/126733545?v=4",
  "langgraph.png": "https://img.icons8.com/color/480/graph.png",
  "git.png": "https://img.icons8.com/color/480/git.png",
  "github.png": "https://img.icons8.com/fluency/480/github.png",
  "docker.png": "https://img.icons8.com/color/480/docker.png",
  "huggingface.png": "https://huggingface.co/datasets/huggingface/brand-assets/resolve/main/hf-logo.png",
  "meta.png": "https://img.icons8.com/color/480/meta.png",
  "excel.png": "https://img.icons8.com/color/480/microsoft-excel-2019.png",
  "aws.png": "https://img.icons8.com/color/480/amazon-web-services.png"
};

const dir = path.join(__dirname, 'public', 'tech');
if (!fs.existsSync(dir)){
    fs.mkdirSync(dir, { recursive: true });
}

async function download() {
  for (const [filename, url] of Object.entries(urls)) {
    const dest = path.join(dir, filename);
    console.log(`Downloading ${url} to ${dest}`);
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const buffer = await response.arrayBuffer();
      fs.writeFileSync(dest, Buffer.from(buffer));
      console.log(`Saved ${filename}`);
    } catch (e) {
      console.error(`Failed to download ${filename}:`, e);
    }
  }
}

download();

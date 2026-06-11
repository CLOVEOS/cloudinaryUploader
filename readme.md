## Getting Started

### Prerequisites
- Node.js 20.19+ or 22.12+
- A [Cloudinary](https://cloudinary.com) account (free tier works)

### 1. Clone the repo

```bash
git clone https://github.com/CLOVEOS/cloudProject.git
cd cloudProject
```

### 2. Backend setup

```bash
cd backend
npm install
```

Create a `.env` file in the `backend/` folder:

```env
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

Start the server:

```bash
npx nodemon main.js
```

Backend runs on `http://localhost:3000`

### 3. Frontend setup

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on `http://localhost:5173`

## Usage

1. Open `http://localhost:5173` in your browser
2. Choose an image file (JPEG or PNG)
3. Preview appears instantly
4. Click **Upload** — image gets sent to Cloudinary
5. Uploaded image URL is displayed with a direct link

## API

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/upload` | Upload a single image |

**Request:** `multipart/form-data` with field name `image`

**Response:**
```json
{
  "url_path": "https://res.cloudinary.com/...",
  "public_id": "cloudProject/abc123"
}
```

## Environment Variables

| Variable | Description |
|----------|-------------|
| `CLOUDINARY_CLOUD_NAME` | Your Cloudinary cloud name |
| `CLOUDINARY_API_KEY` | Your Cloudinary API key |
| `CLOUDINARY_API_SECRET` | Your Cloudinary API secret |

> ⚠️ Never commit your `.env` file. It's listed in `.gitignore`.

## License

MIT
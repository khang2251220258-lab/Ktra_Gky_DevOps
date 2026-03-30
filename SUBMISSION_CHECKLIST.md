# DevOps Mini Project - Submission Checklist

## A. Thong tin chung
- Ho ten sinh vien: Ung Hoang Khang
- MSSV: 2251220258
- Lop: IT01
- Ten ung dung: DevOpsMiniProject_Khang

## B. Gioi thieu ung dung
Ung dung quan ly sinh vien don gian voi frontend HTML/JS, backend Node.js/Express va MySQL. Nguoi dung co the xem danh sach sinh vien va them sinh vien moi thong qua form.

## C. Tinh nang
- Trang chu: hien thi danh sach sinh vien tu database
- Form them sinh vien (POST /api/users)
- API lay danh sach sinh vien (GET /api/users)
- Health check (GET /health)
- Trang thong tin ca nhan tai /about

## D. Use Cases
1. Nguoi dung mo trang chu de xem danh sach sinh vien
2. Nguoi dung nhap thong tin vao form va bam "Them Sinh Vien"
3. He thong luu du lieu vao MySQL va cap nhat danh sach
4. Nguoi cham bai goi /health de kiem tra backend

## E. Link can nop
- GitHub repository: (dien link)
- Docker Hub backend image: (dien link)
- Docker Hub frontend image: (dien link)

## F. Minh chung anh chup
- [ ] Anh VSCode the hien commit history
- [ ] Anh github.com hien thi danh sach branch
- [ ] Anh Docker Desktop/CLI the hien container backend, frontend, database dang chay
- [ ] Anh trang /about
- [ ] Anh endpoint /health tra ve {"status":"ok"}

## G. Kiem tra dieu kien de bai
- [x] Co BE + FE + DB
- [x] Co toi thieu 2 API (GET + POST)
- [x] Co route /about
- [x] Co route /health
- [x] Co file .env
- [x] Co file .env.example
- [x] Co Dockerfile cho backend va frontend
- [x] Co docker-compose.yml
- [x] Co >= 5 commit voi message ro rang
- [ ] Co push image backend + frontend len Docker Hub
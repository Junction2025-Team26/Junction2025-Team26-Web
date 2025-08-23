import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// 미들웨어 설정
app.use(express.json());
app.use(express.static('.')); // 현재 폴더의 정적 파일들 서빙

// 전세계 서포터 카운터 (메모리에 저장)
let globalCounter = 7;

// CORS 설정 (필요시)
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

// 카운터 증가 API
app.post('/api/support', (req, res) => {
    globalCounter++;
    console.log(`🎉 Support clicked! Total supporters: ${globalCounter}`);
    
    res.json({ 
        success: true, 
        totalSupporters: globalCounter,
        message: 'Thank you for supporting Synctank!'
    });
});

// 현재 카운터 조회 API
app.get('/api/supporters', (req, res) => {
    console.log(`📊 Current total supporters: ${globalCounter}`);
    res.json({ 
        totalSupporters: globalCounter,
        message: 'Current supporter count retrieved'
    });
});

// 루트 경로 - index.html 서빙
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// 서버 시작
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log('🚀 Synctank Support Server is running!');
    console.log(`📍 Server URL: http://baburger.xyz:${PORT}`);
    console.log(`📊 Support Counter API: http://baburger.xyz:${PORT}/api/support`);
    console.log(`🔍 Counter Check API: http://baburger.xyz:${PORT}/api/supporters`);
    console.log(`💖 Current supporters: ${globalCounter}`);
    console.log('✨ Ready to count supporters worldwide!');
});

// 서버 종료 시 로그
process.on('SIGINT', () => {
    console.log('\n👋 Server shutting down...');
    console.log(`📊 Final supporter count: ${globalCounter}`);
    process.exit(0);
});

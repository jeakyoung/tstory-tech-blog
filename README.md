ANTI-GRAVITY (Vibe Coding) TESTING

The mobile 폴더 내에서 이미 Jest 기반 테스트 환경을 구축해 두었습니다. 다음 명령어를 통해 테스트할 수 있습니다.

1. 유닛 테스트 (Unit Tests)
작성된 컴포넌트(예: 
Card.tsx
)가 올바르게 렌더링되는지 확인합니다.

bash
cd mobile
npm test
기본적으로 Jest가 실행되며, __tests__ 폴더 내의 테스트 파일들을 수행합니다.
현재 
src/components/
tests
/Card.test.tsx
 파일이 포함되어 있습니다.
2. 앱 실행 및 수동 테스트 (Run App)
실제 앱을 에뮬레이터나 실제 폰에서 확인하려면 다음 명령어를 사용합니다.

bash
cd mobile
npm start
QR 코드 스캔: Expo Go 앱(App Store/Play Store)으로 QR 코드를 스캔하여 실제 폰에서 테스트 가능합니다.
에뮬레이터: a (Android) 또는 i (iOS, Mac인 경우) 키를 눌러 에뮬레이터에서 실행할 수 있습니다.
웹: w 키를 누르면 웹 브라우저에서도 미리보기가 가능합니다.
현재 구성은 TypeScript와 Jest가 이미 설정되어 있어, 코드를 수정 후 바로 npm test를 돌려 안정성을 검증할 수 있습니다.

.PHONY: all
all: clean build

.PHONY: build
build: build_mac_x86_64 build_mac_aarch64 build_windows_x86_64 build_linux_aarch64 build_linux_x86_64

.PHONY: build_mac_x86_64
build_mac_x86_64: 
	deno compile --allow-read --allow-write --target x86_64-apple-darwin -o bin/mac/x86_64/commonLogParse src/main.ts

.PHONY: build_mac_aarch64
build_mac_aarch64: 
	deno compile --allow-read --allow-write --target aarch64-apple-darwin -o bin/mac/aarch64/commonLogParse src/main.ts

.PHONY: build_windows_x86_64
build_windows_x86_64: 
	deno compile --allow-read --allow-write --target x86_64-pc-windows-msvc -o bin/windows/x86_64/commonLogParse src/main.ts

.PHONY: build_linux_aarch64
build_linux_aarch64: 
	deno compile --allow-read --allow-write --target aarch64-unknown-linux-gnu -o bin/linux/aarch64/commonLogParse src/main.ts

.PHONY: build_linux_x86_64
build_linux_x86_64: 
	deno compile --allow-read --allow-write --target x86_64-unknown-linux-gnu -o bin/linux/x86_64/commonLogParse src/main.ts

.PHONY: clean
clean: 
	rm -f bin/linux/x86_64/commonLogParse || false \
	rm -f bin/linux/aarch64/commonLogParse || false \
	rm -f bin/mac/x86_64/commonLogParse || false \
	rm -f bin/mac/aarch64/commonLogParse || false \
	rm -f bin/windows/x86_64/commonLogParse || false

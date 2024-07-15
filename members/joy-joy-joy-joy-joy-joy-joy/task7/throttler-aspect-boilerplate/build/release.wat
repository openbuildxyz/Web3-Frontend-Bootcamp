(module
 (type $0 (func (param i32 i32) (result i32)))
 (type $1 (func (param i32) (result i32)))
 (type $2 (func))
 (type $3 (func (param i32 i32)))
 (type $4 (func (param i32 i32 i32)))
 (type $5 (func (param i32)))
 (type $6 (func (param i32) (result i64)))
 (type $7 (func (result i32)))
 (type $8 (func (param i32 i32 i32) (result i32)))
 (type $9 (func (param i32 i32 i32 i32)))
 (type $10 (func (param i32 i64)))
 (import "env" "abort" (func $~lib/builtins/abort (param i32 i32 i32 i32)))
 (import "aspect-property-api" "__AspectPropertyApi__.get" (func $~lib/@artela/aspect-libs/hostapi/aspect-property-api/__AspectPropertyApi__.get (param i32) (result i32)))
 (import "runtime-api" "__RuntimeContextApi__.get" (func $~lib/@artela/aspect-libs/hostapi/runtime-api/__RuntimeContextApi__.get (param i32) (result i32)))
 (import "aspect-state-api" "__AspectStateApi__.get" (func $~lib/@artela/aspect-libs/hostapi/aspect-state-api/__AspectStateApi__.get (param i32) (result i32)))
 (import "util-api" "__UtilApi__.revert" (func $~lib/@artela/aspect-libs/hostapi/util-api/__UtilApi__.revert (param i32)))
 (import "aspect-state-api" "__AspectStateApi__.set" (func $~lib/@artela/aspect-libs/hostapi/aspect-state-api/__AspectStateApi__.set (param i32 i32)))
 (global $~lib/rt/stub/offset (mut i32) (i32.const 0))
 (global $~lib/as-proto/assembly/Protobuf/READER (mut i32) (i32.const 0))
 (global $~lib/@artela/aspect-libs/common/helper/message/MessageUtil._instance (mut i32) (i32.const 0))
 (global $~lib/@artela/aspect-libs/hostapi/crypto-api/CryptoApi._ins (mut i32) (i32.const 0))
 (global $~lib/@artela/aspect-libs/hostapi/aspect-property-api/AspectPropertyApi._instance (mut i32) (i32.const 0))
 (global $~lib/@artela/aspect-libs/hostapi/util-api/UtilApi._instance (mut i32) (i32.const 0))
 (global $~lib/@artela/aspect-libs/hostapi/aspect-state-api/AspectStateApi._instance (mut i32) (i32.const 0))
 (global $~lib/@artela/aspect-libs/hostapi/trace-api/TraceApi._instance (mut i32) (i32.const 0))
 (global $~lib/@artela/aspect-libs/hostapi/aspect-transient-storage-api/AspectTransientStorageApi._instance (mut i32) (i32.const 0))
 (global $~lib/@artela/aspect-libs/hostapi/evm-call-api/EvmCallApi._instance (mut i32) (i32.const 0))
 (global $~lib/@artela/aspect-libs/hostapi/runtime-api/RuntimeContextApi._instance (mut i32) (i32.const 0))
 (global $~lib/@artela/aspect-libs/hostapi/statedb-api/StateDbApi._instance (mut i32) (i32.const 0))
 (global $~lib/@artela/aspect-libs/components/aspect/aspect-state/MutableAspectState._instance (mut i32) (i32.const 0))
 (global $~lib/@artela/aspect-libs/components/aspect/aspect-state/ImmutableAspectState._instance (mut i32) (i32.const 0))
 (global $~lib/@artela/aspect-libs/components/aspect/aspect-property/AspectProperty._instance (mut i32) (i32.const 0))
 (global $~lib/@artela/aspect-libs/components/aspect/aspect-transient-storage/TransientStorage._instance (mut i32) (i32.const 0))
 (global $~lib/@artela/aspect-libs/types/entrance/entryPoint (mut i32) (i32.const 0))
 (global $aspect/index/aspect (mut i32) (i32.const 0))
 (global $~argumentsLength (mut i32) (i32.const 0))
 (global $~lib/rt/__rtti_base i32 (i32.const 9232))
 (global $~started (mut i32) (i32.const 0))
 (memory $0 1)
 (data $0 (i32.const 1036) "<")
 (data $0.1 (i32.const 1048) "\02\00\00\00(\00\00\00A\00l\00l\00o\00c\00a\00t\00i\00o\00n\00 \00t\00o\00o\00 \00l\00a\00r\00g\00e")
 (data $1 (i32.const 1100) "<")
 (data $1.1 (i32.const 1112) "\02\00\00\00\1e\00\00\00~\00l\00i\00b\00/\00r\00t\00/\00s\00t\00u\00b\00.\00t\00s")
 (data $2 (i32.const 1164) "\1c")
 (data $2.1 (i32.const 1176) "\01")
 (data $3 (i32.const 1196) "\1c")
 (data $3.1 (i32.const 1208) "\01")
 (data $4 (i32.const 1228) "\1c")
 (data $4.1 (i32.const 1240) "\01")
 (data $5 (i32.const 1260) ",")
 (data $5.1 (i32.const 1272) "\02\00\00\00\1c\00\00\00I\00n\00v\00a\00l\00i\00d\00 \00l\00e\00n\00g\00t\00h")
 (data $6 (i32.const 1308) "<")
 (data $6.1 (i32.const 1320) "\02\00\00\00&\00\00\00~\00l\00i\00b\00/\00a\00r\00r\00a\00y\00b\00u\00f\00f\00e\00r\00.\00t\00s")
 (data $7 (i32.const 1372) "\1c")
 (data $7.1 (i32.const 1384) "\02\00\00\00\n\00\00\00E\00r\00r\00o\00r")
 (data $8 (i32.const 1404) "\1c")
 (data $8.1 (i32.const 1416) "\02")
 (data $9 (i32.const 1436) "\\")
 (data $9.1 (i32.const 1448) "\02\00\00\00B\00\00\00l\00o\00a\00d\00 \00r\00u\00n\00t\00i\00m\00e\00 \00c\00o\00n\00t\00e\00x\00t\00 \00v\00a\00l\00u\00e\00 \00f\00a\00i\00l\00e\00d")
 (data $10 (i32.const 1532) "L")
 (data $10.1 (i32.const 1544) "\02\00\00\00<\00\00\00f\00a\00i\00l\00e\00d\00 \00t\00o\00 \00l\00o\00a\00d\00 \00a\00s\00p\00e\00c\00t\00 \00p\00r\00o\00p\00e\00r\00t\00y")
 (data $11 (i32.const 1612) "L")
 (data $11.1 (i32.const 1624) "\02\00\00\00:\00\00\00f\00a\00i\00l\00e\00d\00 \00t\00o\00 \00l\00o\00a\00d\00 \00a\00s\00p\00e\00c\00t\00 \00c\00o\00n\00t\00e\00x\00t")
 (data $12 (i32.const 1692) "\\")
 (data $12.1 (i32.const 1704) "\02\00\00\00B\00\00\00f\00a\00i\00l\00e\00d\00 \00t\00o\00 \00r\00e\00a\00d\00 \00a\00s\00p\00e\00c\00t\00 \00s\00t\00a\00t\00e\00 \00v\00a\00l\00u\00e")
 (data $13 (i32.const 1788) "\\")
 (data $13.1 (i32.const 1800) "\02\00\00\00F\00\00\00f\00a\00i\00l\00e\00d\00 \00t\00o\00 \00u\00p\00d\00a\00t\00e\00 \00a\00s\00p\00e\00c\00t\00 \00s\00t\00a\00t\00e\00 \00v\00a\00l\00u\00e")
 (data $14 (i32.const 1884) "L")
 (data $14.1 (i32.const 1896) "\02\00\00\008\00\00\00u\00n\00a\00b\00l\00e\00 \00t\00o\00 \00p\00a\00r\00s\00e\00 \00a\00s\00p\00e\00c\00t\00 \00v\00a\00l\00u\00e")
 (data $15 (i32.const 1964) "|")
 (data $15.1 (i32.const 1976) "\02\00\00\00`\00\00\00u\00n\00k\00n\00o\00w\00a\00b\00l\00e\00 \00c\00o\00n\00t\00e\00x\00t\00,\00 \00n\00o\00t\00 \00a\00u\00t\00h\00o\00r\00i\00z\00e\00d\00 \00t\00o\00 \00i\00n\00i\00t\00i\00a\00l\00i\00z\00e")
 (data $16 (i32.const 2092) "|")
 (data $16.1 (i32.const 2104) "\02\00\00\00^\00\00\00U\00n\00e\00x\00p\00e\00c\00t\00e\00d\00 \00\'\00n\00u\00l\00l\00\'\00 \00(\00n\00o\00t\00 \00a\00s\00s\00i\00g\00n\00e\00d\00 \00o\00r\00 \00f\00a\00i\00l\00e\00d\00 \00c\00a\00s\00t\00)")
 (data $17 (i32.const 2220) "l")
 (data $17.1 (i32.const 2232) "\02\00\00\00\\\00\00\00~\00l\00i\00b\00/\00@\00a\00r\00t\00e\00l\00a\00/\00a\00s\00p\00e\00c\00t\00-\00l\00i\00b\00s\00/\00h\00o\00s\00t\00a\00p\00i\00/\00c\00r\00y\00p\00t\00o\00-\00a\00p\00i\00.\00t\00s")
 (data $18 (i32.const 2332) "|")
 (data $18.1 (i32.const 2344) "\02\00\00\00^\00\00\00~\00l\00i\00b\00/\00@\00a\00r\00t\00e\00l\00a\00/\00a\00s\00p\00e\00c\00t\00-\00l\00i\00b\00s\00/\00h\00o\00s\00t\00a\00p\00i\00/\00r\00u\00n\00t\00i\00m\00e\00-\00a\00p\00i\00.\00t\00s")
 (data $19 (i32.const 2460) "|")
 (data $19.1 (i32.const 2472) "\02\00\00\00h\00\00\00~\00l\00i\00b\00/\00@\00a\00r\00t\00e\00l\00a\00/\00a\00s\00p\00e\00c\00t\00-\00l\00i\00b\00s\00/\00h\00o\00s\00t\00a\00p\00i\00/\00a\00s\00p\00e\00c\00t\00-\00s\00t\00a\00t\00e\00-\00a\00p\00i\00.\00t\00s")
 (data $20 (i32.const 2588) "\8c")
 (data $20.1 (i32.const 2600) "\02\00\00\00n\00\00\00~\00l\00i\00b\00/\00@\00a\00r\00t\00e\00l\00a\00/\00a\00s\00p\00e\00c\00t\00-\00l\00i\00b\00s\00/\00h\00o\00s\00t\00a\00p\00i\00/\00a\00s\00p\00e\00c\00t\00-\00p\00r\00o\00p\00e\00r\00t\00y\00-\00a\00p\00i\00.\00t\00s")
 (data $21 (i32.const 2732) "\9c")
 (data $21.1 (i32.const 2744) "\02\00\00\00\80\00\00\00~\00l\00i\00b\00/\00@\00a\00r\00t\00e\00l\00a\00/\00a\00s\00p\00e\00c\00t\00-\00l\00i\00b\00s\00/\00h\00o\00s\00t\00a\00p\00i\00/\00a\00s\00p\00e\00c\00t\00-\00t\00r\00a\00n\00s\00i\00e\00n\00t\00-\00s\00t\00o\00r\00a\00g\00e\00-\00a\00p\00i\00.\00t\00s")
 (data $22 (i32.const 2892) "|")
 (data $22.1 (i32.const 2904) "\02\00\00\00`\00\00\00~\00l\00i\00b\00/\00@\00a\00r\00t\00e\00l\00a\00/\00a\00s\00p\00e\00c\00t\00-\00l\00i\00b\00s\00/\00h\00o\00s\00t\00a\00p\00i\00/\00e\00v\00m\00-\00c\00a\00l\00l\00-\00a\00p\00i\00.\00t\00s")
 (data $23 (i32.const 3020) "|")
 (data $23.1 (i32.const 3032) "\02\00\00\00^\00\00\00~\00l\00i\00b\00/\00@\00a\00r\00t\00e\00l\00a\00/\00a\00s\00p\00e\00c\00t\00-\00l\00i\00b\00s\00/\00h\00o\00s\00t\00a\00p\00i\00/\00s\00t\00a\00t\00e\00d\00b\00-\00a\00p\00i\00.\00t\00s")
 (data $24 (i32.const 3148) "l")
 (data $24.1 (i32.const 3160) "\02\00\00\00X\00\00\00~\00l\00i\00b\00/\00@\00a\00r\00t\00e\00l\00a\00/\00a\00s\00p\00e\00c\00t\00-\00l\00i\00b\00s\00/\00h\00o\00s\00t\00a\00p\00i\00/\00u\00t\00i\00l\00-\00a\00p\00i\00.\00t\00s")
 (data $25 (i32.const 3260) "l")
 (data $25.1 (i32.const 3272) "\02\00\00\00Z\00\00\00~\00l\00i\00b\00/\00@\00a\00r\00t\00e\00l\00a\00/\00a\00s\00p\00e\00c\00t\00-\00l\00i\00b\00s\00/\00h\00o\00s\00t\00a\00p\00i\00/\00t\00r\00a\00c\00e\00-\00a\00p\00i\00.\00t\00s")
 (data $26 (i32.const 3372) "\8c")
 (data $26.1 (i32.const 3384) "\02\00\00\00t\00\00\00~\00l\00i\00b\00/\00@\00a\00r\00t\00e\00l\00a\00/\00a\00s\00p\00e\00c\00t\00-\00l\00i\00b\00s\00/\00c\00o\00m\00p\00o\00n\00e\00n\00t\00s\00/\00a\00s\00p\00e\00c\00t\00/\00a\00s\00p\00e\00c\00t\00-\00s\00t\00a\00t\00e\00.\00t\00s")
 (data $27 (i32.const 3516) "\8c")
 (data $27.1 (i32.const 3528) "\02\00\00\00z\00\00\00~\00l\00i\00b\00/\00@\00a\00r\00t\00e\00l\00a\00/\00a\00s\00p\00e\00c\00t\00-\00l\00i\00b\00s\00/\00c\00o\00m\00p\00o\00n\00e\00n\00t\00s\00/\00a\00s\00p\00e\00c\00t\00/\00a\00s\00p\00e\00c\00t\00-\00p\00r\00o\00p\00e\00r\00t\00y\00.\00t\00s")
 (data $28 (i32.const 3660) "\9c")
 (data $28.1 (i32.const 3672) "\02\00\00\00\8c\00\00\00~\00l\00i\00b\00/\00@\00a\00r\00t\00e\00l\00a\00/\00a\00s\00p\00e\00c\00t\00-\00l\00i\00b\00s\00/\00c\00o\00m\00p\00o\00n\00e\00n\00t\00s\00/\00a\00s\00p\00e\00c\00t\00/\00a\00s\00p\00e\00c\00t\00-\00t\00r\00a\00n\00s\00i\00e\00n\00t\00-\00s\00t\00o\00r\00a\00g\00e\00.\00t\00s")
 (data $29 (i32.const 3820) "\9c")
 (data $29.1 (i32.const 3832) "\02\00\00\00\80\00\00\00A\00B\00C\00D\00E\00F\00G\00H\00I\00J\00K\00L\00M\00N\00O\00P\00Q\00R\00S\00T\00U\00V\00W\00X\00Y\00Z\00a\00b\00c\00d\00e\00f\00g\00h\00i\00j\00k\00l\00m\00n\00o\00p\00q\00r\00s\00t\00u\00v\00w\00x\00y\00z\000\001\002\003\004\005\006\007\008\009\00+\00/")
 (data $30 (i32.const 3980) ",")
 (data $30.1 (i32.const 3992) "\02\00\00\00\16\00\00\00o\00n\00T\00x\00R\00e\00c\00e\00i\00v\00e")
 (data $31 (i32.const 4028) "<")
 (data $31.1 (i32.const 4040) "\02\00\00\00\"\00\00\00o\00n\00B\00l\00o\00c\00k\00I\00n\00i\00t\00i\00a\00l\00i\00z\00e")
 (data $32 (i32.const 4092) ",")
 (data $32.1 (i32.const 4104) "\02\00\00\00\10\00\00\00v\00e\00r\00i\00f\00y\00T\00x")
 (data $33 (i32.const 4140) ",")
 (data $33.1 (i32.const 4152) "\02\00\00\00\18\00\00\00p\00r\00e\00T\00x\00E\00x\00e\00c\00u\00t\00e")
 (data $34 (i32.const 4188) "<")
 (data $34.1 (i32.const 4200) "\02\00\00\00\1e\00\00\00p\00r\00e\00C\00o\00n\00t\00r\00a\00c\00t\00C\00a\00l\00l")
 (data $35 (i32.const 4252) "<")
 (data $35.1 (i32.const 4264) "\02\00\00\00 \00\00\00p\00o\00s\00t\00C\00o\00n\00t\00r\00a\00c\00t\00C\00a\00l\00l")
 (data $36 (i32.const 4316) ",")
 (data $36.1 (i32.const 4328) "\02\00\00\00\1a\00\00\00p\00o\00s\00t\00T\00x\00E\00x\00e\00c\00u\00t\00e")
 (data $37 (i32.const 4364) ",")
 (data $37.1 (i32.const 4376) "\02\00\00\00\18\00\00\00p\00o\00s\00t\00T\00x\00C\00o\00m\00m\00i\00t")
 (data $38 (i32.const 4412) "<")
 (data $38.1 (i32.const 4424) "\02\00\00\00\1e\00\00\00o\00n\00B\00l\00o\00c\00k\00F\00i\00n\00a\00l\00i\00z\00e")
 (data $39 (i32.const 4476) ",")
 (data $39.1 (i32.const 4488) "\02\00\00\00\12\00\00\00o\00p\00e\00r\00a\00t\00i\00o\00n")
 (data $40 (i32.const 4524) ",")
 (data $40.1 (i32.const 4536) "\02\00\00\00\0e\00\00\00i\00s\00O\00w\00n\00e\00r")
 (data $41 (i32.const 4572) ",")
 (data $41.1 (i32.const 4584) "\02\00\00\00\10\00\00\00f\00i\00l\00t\00e\00r\00T\00x")
 (data $42 (i32.const 4620) "<")
 (data $42.1 (i32.const 4632) "\02\00\00\00(\00\00\00a\00s\00p\00e\00c\00t\00.\00v\002\00.\00S\00t\00r\00i\00n\00g\00D\00a\00t\00a")
 (data $43 (i32.const 4684) "<")
 (data $43.1 (i32.const 4696) "\02\00\00\00\"\00\00\00a\00s\00p\00e\00c\00t\00.\00v\002\00.\00I\00n\00t\00D\00a\00t\00a")
 (data $44 (i32.const 4748) "<")
 (data $44.1 (i32.const 4760) "\02\00\00\00$\00\00\00a\00s\00p\00e\00c\00t\00.\00v\002\00.\00B\00o\00o\00l\00D\00a\00t\00a")
 (data $45 (i32.const 4812) "<")
 (data $45.1 (i32.const 4824) "\02\00\00\00&\00\00\00a\00s\00p\00e\00c\00t\00.\00v\002\00.\00B\00y\00t\00e\00s\00D\00a\00t\00a")
 (data $46 (i32.const 4876) "L")
 (data $46.1 (i32.const 4888) "\02\00\00\002\00\00\00a\00s\00p\00e\00c\00t\00.\00v\002\00.\00S\00a\00t\00e\00C\00h\00a\00n\00g\00e\00Q\00u\00e\00r\00y")
 (data $47 (i32.const 4956) "L")
 (data $47.1 (i32.const 4968) "\02\00\00\000\00\00\00a\00s\00p\00e\00c\00t\00.\00v\002\00.\00C\00a\00l\00l\00S\00t\00a\00c\00k\00Q\00u\00e\00r\00y")
 (data $48 (i32.const 5036) "|")
 (data $48.1 (i32.const 5048) "\02\00\00\00b\00\00\00~\00l\00i\00b\00/\00@\00a\00r\00t\00e\00l\00a\00/\00a\00s\00p\00e\00c\00t\00-\00l\00i\00b\00s\00/\00c\00o\00m\00m\00o\00n\00/\00h\00e\00l\00p\00e\00r\00/\00m\00e\00s\00s\00a\00g\00e\00.\00t\00s")
 (data $49 (i32.const 5164) ",")
 (data $49.1 (i32.const 5176) "\02\00\00\00\1c\00\00\00~\00l\00i\00b\00/\00s\00t\00r\00i\00n\00g\00.\00t\00s")
 (data $50 (i32.const 5212) "<")
 (data $50.1 (i32.const 5224) "\02\00\00\00$\00\00\00I\00n\00d\00e\00x\00 \00o\00u\00t\00 \00o\00f\00 \00r\00a\00n\00g\00e")
 (data $51 (i32.const 5276) "<")
 (data $51.1 (i32.const 5288) "\02\00\00\00$\00\00\00~\00l\00i\00b\00/\00t\00y\00p\00e\00d\00a\00r\00r\00a\00y\00.\00t\00s")
 (data $52 (i32.const 5340) "l")
 (data $52.1 (i32.const 5352) "\02\00\00\00\\\00\00\00~\00l\00i\00b\00/\00@\00a\00r\00t\00e\00l\00a\00/\00a\00s\00p\00e\00c\00t\00-\00l\00i\00b\00s\00/\00t\00y\00p\00e\00s\00/\00a\00s\00p\00e\00c\00t\00-\00e\00n\00t\00r\00y\00.\00t\00s")
 (data $53 (i32.const 5452) "L")
 (data $53.1 (i32.const 5464) "\02\00\00\002\00\00\00a\00s\00p\00e\00c\00t\00 \00i\00s\00 \00n\00o\00t\00 \00i\00n\00i\00t\00i\00a\00l\00i\00z\00e\00d")
 (data $54 (i32.const 5532) "\1c")
 (data $54.1 (i32.const 5544) "(\00\00\00\08\00\00\00\01")
 (data $55 (i32.const 5564) "<")
 (data $55.1 (i32.const 5576) "\02\00\00\00 \00\00\00i\00n\00v\00a\00l\00i\00d\00 \00d\00o\00w\00n\00c\00a\00s\00t")
 (data $56 (i32.const 5628) "\1c")
 (data $56.1 (i32.const 5640) ",\00\00\00\08\00\00\00\02")
 (data $57 (i32.const 5660) "\1c")
 (data $57.1 (i32.const 5672) "0\00\00\00\08\00\00\00\03")
 (data $58 (i32.const 5692) "\1c")
 (data $58.1 (i32.const 5704) "3\00\00\00\08\00\00\00\04")
 (data $59 (i32.const 5724) "\1c")
 (data $59.1 (i32.const 5736) "7\00\00\00\08\00\00\00\05")
 (data $60 (i32.const 5756) "\1c")
 (data $60.1 (i32.const 5768) ":\00\00\00\08\00\00\00\06")
 (data $61 (i32.const 5788) ",")
 (data $61.1 (i32.const 5800) "\02\00\00\00\0e\00\00\00m\00e\00t\00h\00o\00d\00 ")
 (data $62 (i32.const 5836) "L")
 (data $62.1 (i32.const 5848) "\02\00\00\00:\00\00\00 \00n\00o\00t\00 \00f\00o\00u\00n\00d\00 \00o\00r\00 \00n\00o\00t\00 \00i\00m\00p\00l\00e\00m\00e\00n\00t\00e\00d")
 (data $63 (i32.const 5916) "l")
 (data $63.1 (i32.const 5928) "\02\00\00\00\\\00\00\00~\00l\00i\00b\00/\00a\00s\00-\00p\00r\00o\00t\00o\00/\00a\00s\00s\00e\00m\00b\00l\00y\00/\00i\00n\00t\00e\00r\00n\00a\00l\00/\00F\00i\00x\00e\00d\00R\00e\00a\00d\00e\00r\00.\00t\00s")
 (data $64 (i32.const 6028) "<")
 (data $64.1 (i32.const 6040) "\02\00\00\00$\00\00\00I\00n\00v\00a\00l\00i\00d\00 \00w\00i\00r\00e\00 \00t\00y\00p\00e\00 ")
 (data $65 (i32.const 6092) "|")
 (data $65.1 (i32.const 6104) "\02\00\00\00d\00\00\00t\00o\00S\00t\00r\00i\00n\00g\00(\00)\00 \00r\00a\00d\00i\00x\00 \00a\00r\00g\00u\00m\00e\00n\00t\00 \00m\00u\00s\00t\00 \00b\00e\00 \00b\00e\00t\00w\00e\00e\00n\00 \002\00 \00a\00n\00d\00 \003\006")
 (data $66 (i32.const 6220) "<")
 (data $66.1 (i32.const 6232) "\02\00\00\00&\00\00\00~\00l\00i\00b\00/\00u\00t\00i\00l\00/\00n\00u\00m\00b\00e\00r\00.\00t\00s")
 (data $67 (i32.const 6284) "\1c")
 (data $67.1 (i32.const 6296) "\02\00\00\00\02\00\00\000")
 (data $68 (i32.const 6316) "0\000\000\001\000\002\000\003\000\004\000\005\000\006\000\007\000\008\000\009\001\000\001\001\001\002\001\003\001\004\001\005\001\006\001\007\001\008\001\009\002\000\002\001\002\002\002\003\002\004\002\005\002\006\002\007\002\008\002\009\003\000\003\001\003\002\003\003\003\004\003\005\003\006\003\007\003\008\003\009\004\000\004\001\004\002\004\003\004\004\004\005\004\006\004\007\004\008\004\009\005\000\005\001\005\002\005\003\005\004\005\005\005\006\005\007\005\008\005\009\006\000\006\001\006\002\006\003\006\004\006\005\006\006\006\007\006\008\006\009\007\000\007\001\007\002\007\003\007\004\007\005\007\006\007\007\007\008\007\009\008\000\008\001\008\002\008\003\008\004\008\005\008\006\008\007\008\008\008\009\009\000\009\001\009\002\009\003\009\004\009\005\009\006\009\007\009\008\009\009")
 (data $69 (i32.const 6716) "\1c\04")
 (data $69.1 (i32.const 6728) "\02\00\00\00\00\04\00\000\000\000\001\000\002\000\003\000\004\000\005\000\006\000\007\000\008\000\009\000\00a\000\00b\000\00c\000\00d\000\00e\000\00f\001\000\001\001\001\002\001\003\001\004\001\005\001\006\001\007\001\008\001\009\001\00a\001\00b\001\00c\001\00d\001\00e\001\00f\002\000\002\001\002\002\002\003\002\004\002\005\002\006\002\007\002\008\002\009\002\00a\002\00b\002\00c\002\00d\002\00e\002\00f\003\000\003\001\003\002\003\003\003\004\003\005\003\006\003\007\003\008\003\009\003\00a\003\00b\003\00c\003\00d\003\00e\003\00f\004\000\004\001\004\002\004\003\004\004\004\005\004\006\004\007\004\008\004\009\004\00a\004\00b\004\00c\004\00d\004\00e\004\00f\005\000\005\001\005\002\005\003\005\004\005\005\005\006\005\007\005\008\005\009\005\00a\005\00b\005\00c\005\00d\005\00e\005\00f\006\000\006\001\006\002\006\003\006\004\006\005\006\006\006\007\006\008\006\009\006\00a\006\00b\006\00c\006\00d\006\00e\006\00f\007\000\007\001\007\002\007\003\007\004\007\005\007\006\007\007\007\008\007\009\007\00a\007\00b\007\00c\007\00d\007\00e\007\00f\008\000\008\001\008\002\008\003\008\004\008\005\008\006\008\007\008\008\008\009\008\00a\008\00b\008\00c\008\00d\008\00e\008\00f\009\000\009\001\009\002\009\003\009\004\009\005\009\006\009\007\009\008\009\009\009\00a\009\00b\009\00c\009\00d\009\00e\009\00f\00a\000\00a\001\00a\002\00a\003\00a\004\00a\005\00a\006\00a\007\00a\008\00a\009\00a\00a\00a\00b\00a\00c\00a\00d\00a\00e\00a\00f\00b\000\00b\001\00b\002\00b\003\00b\004\00b\005\00b\006\00b\007\00b\008\00b\009\00b\00a\00b\00b\00b\00c\00b\00d\00b\00e\00b\00f\00c\000\00c\001\00c\002\00c\003\00c\004\00c\005\00c\006\00c\007\00c\008\00c\009\00c\00a\00c\00b\00c\00c\00c\00d\00c\00e\00c\00f\00d\000\00d\001\00d\002\00d\003\00d\004\00d\005\00d\006\00d\007\00d\008\00d\009\00d\00a\00d\00b\00d\00c\00d\00d\00d\00e\00d\00f\00e\000\00e\001\00e\002\00e\003\00e\004\00e\005\00e\006\00e\007\00e\008\00e\009\00e\00a\00e\00b\00e\00c\00e\00d\00e\00e\00e\00f\00f\000\00f\001\00f\002\00f\003\00f\004\00f\005\00f\006\00f\007\00f\008\00f\009\00f\00a\00f\00b\00f\00c\00f\00d\00f\00e\00f\00f")
 (data $70 (i32.const 7772) "\\")
 (data $70.1 (i32.const 7784) "\02\00\00\00H\00\00\000\001\002\003\004\005\006\007\008\009\00a\00b\00c\00d\00e\00f\00g\00h\00i\00j\00k\00l\00m\00n\00o\00p\00q\00r\00s\00t\00u\00v\00w\00x\00y\00z")
 (data $71 (i32.const 7868) ",")
 (data $71.1 (i32.const 7880) "\02\00\00\00\10\00\00\00i\00n\00t\00e\00r\00v\00a\00l")
 (data $72 (i32.const 7916) "<")
 (data $72.1 (i32.const 7928) "\02\00\00\00$\00\00\00U\00n\00p\00a\00i\00r\00e\00d\00 \00s\00u\00r\00r\00o\00g\00a\00t\00e")
 (data $73 (i32.const 7980) "\\")
 (data $73.1 (i32.const 7992) "\02\00\00\00F\00\00\00C\00a\00n\00n\00o\00t\00 \00c\00a\00s\00t\00 \00n\00e\00g\00a\00t\00i\00v\00e\00 \00i\00n\00t\00e\00g\00e\00r\00 \00t\00o\00 \00u\006\004")
 (data $74 (i32.const 8076) "|")
 (data $74.1 (i32.const 8088) "\02\00\00\00f\00\00\00~\00l\00i\00b\00/\00@\00a\00r\00t\00e\00l\00a\00/\00a\00s\00p\00e\00c\00t\00-\00l\00i\00b\00s\00/\00c\00o\00m\00m\00o\00n\00/\00w\00r\00a\00p\00t\00y\00p\00e\00s\00/\00b\00i\00g\00i\00n\00t\00.\00t\00s")
 (data $75 (i32.const 8204) "\8c")
 (data $75.1 (i32.const 8216) "\02\00\00\00|\00\00\00I\00n\00t\00e\00g\00e\00r\00 \00o\00v\00e\00r\00f\00l\00o\00w\00:\00 \00c\00a\00n\00n\00o\00t\00 \00o\00u\00t\00p\00u\00t\00 \00u\006\004\00 \00f\00r\00o\00m\00 \00a\00n\00 \00i\00n\00t\00e\00g\00e\00r\00 \00t\00h\00a\00t\00 \00u\00s\00e\00s\00 ")
 (data $76 (i32.const 8348) "\1c")
 (data $76.1 (i32.const 8360) "\02\00\00\00\n\00\00\00 \00b\00i\00t\00s")
 (data $77 (i32.const 8380) "\1c\00\00\00\03\00\00\00\00\00\00\00=\00\00\00\0c\00\00\00  \00\00\00\00\00\00\b0 ")
 (data $78 (i32.const 8412) "|")
 (data $78.1 (i32.const 8424) "\02\00\00\00`\00\00\00B\00i\00g\00I\00n\00t\00 \00o\00n\00l\00y\00 \00p\00r\00i\00n\00t\00s\00 \00s\00t\00r\00i\00n\00g\00s\00 \00i\00n\00 \00r\00a\00d\00i\00x\00 \002\00 \00t\00h\00r\00o\00u\00g\00h\00 \001\006")
 (data $79 (i32.const 8540) "\1c")
 (data $79.1 (i32.const 8552) "\02\00\00\00\02\00\00\00-")
 (data $80 (i32.const 8572) "\1c")
 (data $80.1 (i32.const 8584) "\01")
 (data $81 (i32.const 8604) ",")
 (data $81.1 (i32.const 8616) "\02\00\00\00\1c\00\00\00D\00i\00v\00i\00d\00e\00 \00b\00y\00 \00z\00e\00r\00o")
 (data $82 (i32.const 8652) ",")
 (data $82.1 (i32.const 8664) "\02\00\00\00\1a\00\00\00~\00l\00i\00b\00/\00a\00r\00r\00a\00y\00.\00t\00s")
 (data $83 (i32.const 8700) "\1c")
 (data $83.1 (i32.const 8712) "\02\00\00\00\n\00\00\00l\00i\00m\00i\00t")
 (data $84 (i32.const 8732) "<")
 (data $84.1 (i32.const 8744) "\02\00\00\00\1e\00\00\00a\00s\00p\00e\00c\00t\00/\00i\00n\00d\00e\00x\00.\00t\00s")
 (data $85 (i32.const 8796) "<")
 (data $85.1 (i32.const 8808) "\02\00\00\00 \00\00\000\001\002\003\004\005\006\007\008\009\00a\00b\00c\00d\00e\00f")
 (data $86 (i32.const 8860) "\1c")
 (data $86.1 (i32.const 8872) "\02\00\00\00\02\00\00\00:")
 (data $87 (i32.const 8892) "\1c\00\00\00\03\00\00\00\00\00\00\00=\00\00\00\0c\00\00\00\00\00\00\00\b0\"")
 (data $88 (i32.const 8924) "<")
 (data $88.1 (i32.const 8936) "\02\00\00\00,\00\00\00b\00l\00o\00c\00k\00.\00h\00e\00a\00d\00e\00r\00.\00t\00i\00m\00e\00s\00t\00a\00m\00p")
 (data $89 (i32.const 8988) "\1c")
 (data $89.1 (i32.const 9000) "?\00\00\00\08\00\00\00\07")
 (data $90 (i32.const 9020) ",")
 (data $90.1 (i32.const 9032) "\02\00\00\00\14\00\00\00l\00a\00s\00t\00E\00x\00e\00c\00A\00t")
 (data $91 (i32.const 9068) ",")
 (data $91.1 (i32.const 9080) "\02\00\00\00\12\00\00\00t\00h\00r\00o\00t\00t\00l\00e\00d")
 (data $92 (i32.const 9116) ",")
 (data $92.1 (i32.const 9128) "\02\00\00\00\12\00\00\00e\00x\00e\00c\00T\00i\00m\00e\00s")
 (data $93 (i32.const 9164) "<")
 (data $93.1 (i32.const 9176) "\02\00\00\00*\00\00\00e\00x\00e\00c\00u\00t\00i\00o\00n\00 \00t\00i\00m\00e\00 \00e\00x\00c\00e\00e\00d")
 (data $94 (i32.const 9232) "D\00\00\00 \00\00\00 \00\00\00 ")
 (data $94.1 (i32.const 9256) " \00\00\00\00\00\00\00\02\01\00\00\02\t\00\00A\00\00\00\00\00\00\00 ")
 (data $94.2 (i32.const 9292) " \00\00\00 \00\00\00 \00\00\00 \00\00\00 \00\00\00 \00\00\00 \00\00\00 \00\00\00 \00\00\00 \00\00\00 \00\00\00 \00\00\00 \00\00\00 \00\00\00\00\00\00\00 \00\00\00 \00\00\00 \00\00\00 \00\00\00\00\00\00\00 ")
 (data $94.3 (i32.const 9392) " \00\00\00\00\00\00\00 ")
 (data $94.4 (i32.const 9416) " ")
 (data $94.5 (i32.const 9444) " \00\00\00\00\00\00\00 \00\00\00\00\00\00\00 ")
 (data $94.6 (i32.const 9476) "\01\01\00\00\04A\00\00 ")
 (data $94.7 (i32.const 9500) " \00\00\00 ")
 (table $0 8 8 funcref)
 (elem $0 (i32.const 1) $~lib/@artela/aspect-libs/proto/aspect/v2/tx-verify-input/TxVerifyInput.decode $~lib/@artela/aspect-libs/proto/aspect/v2/pre-tx-execute-input/PreTxExecuteInput.decode $~lib/@artela/aspect-libs/proto/aspect/v2/pre-contract-call-input/PreContractCallInput.decode $~lib/@artela/aspect-libs/proto/aspect/v2/post-contract-call-input/PostContractCallInput.decode $~lib/@artela/aspect-libs/proto/aspect/v2/post-tx-execute-input/PostTxExecuteInput.decode $~lib/@artela/aspect-libs/proto/aspect/v2/operation-input/OperationInput.decode $~lib/@artela/aspect-libs/proto/aspect/v2/uint-data/UintData.decode)
 (export "execute" (func $~lib/@artela/aspect-libs/types/entrance/execute))
 (export "allocate" (func $~lib/@artela/aspect-libs/types/entrance/allocate))
 (export "__new" (func $~lib/rt/stub/__new))
 (export "__pin" (func $~lib/rt/stub/__pin))
 (export "__unpin" (func $~lib/rt/stub/__unpin))
 (export "__collect" (func $~lib/rt/stub/__collect))
 (export "__rtti_base" (global $~lib/rt/__rtti_base))
 (export "memory" (memory $0))
 (export "__aspect_start__" (func $~start))
 (func $~lib/rt/stub/__alloc (param $0 i32) (result i32)
  (local $1 i32)
  (local $2 i32)
  (local $3 i32)
  (local $4 i32)
  (local $5 i32)
  local.get $0
  i32.const 1073741820
  i32.gt_u
  if
   i32.const 1056
   i32.const 1120
   i32.const 33
   i32.const 29
   call $~lib/builtins/abort
   unreachable
  end
  global.get $~lib/rt/stub/offset
  local.set $1
  global.get $~lib/rt/stub/offset
  i32.const 4
  i32.add
  local.tee $2
  local.get $0
  i32.const 19
  i32.add
  i32.const -16
  i32.and
  i32.const 4
  i32.sub
  local.tee $0
  i32.add
  local.tee $3
  memory.size
  local.tee $4
  i32.const 16
  i32.shl
  i32.const 15
  i32.add
  i32.const -16
  i32.and
  local.tee $5
  i32.gt_u
  if
   local.get $4
   local.get $3
   local.get $5
   i32.sub
   i32.const 65535
   i32.add
   i32.const -65536
   i32.and
   i32.const 16
   i32.shr_u
   local.tee $5
   local.get $4
   local.get $5
   i32.gt_s
   select
   memory.grow
   i32.const 0
   i32.lt_s
   if
    local.get $5
    memory.grow
    i32.const 0
    i32.lt_s
    if
     unreachable
    end
   end
  end
  local.get $3
  global.set $~lib/rt/stub/offset
  local.get $1
  local.get $0
  i32.store
  local.get $2
 )
 (func $~lib/rt/stub/__new (param $0 i32) (param $1 i32) (result i32)
  (local $2 i32)
  (local $3 i32)
  local.get $0
  i32.const 1073741804
  i32.gt_u
  if
   i32.const 1056
   i32.const 1120
   i32.const 86
   i32.const 30
   call $~lib/builtins/abort
   unreachable
  end
  local.get $0
  i32.const 16
  i32.add
  call $~lib/rt/stub/__alloc
  local.tee $3
  i32.const 4
  i32.sub
  local.tee $2
  i32.const 0
  i32.store offset=4
  local.get $2
  i32.const 0
  i32.store offset=8
  local.get $2
  local.get $1
  i32.store offset=12
  local.get $2
  local.get $0
  i32.store offset=16
  local.get $3
  i32.const 16
  i32.add
 )
 (func $~lib/as-proto/assembly/Writer/Writer#constructor (param $0 i32) (result i32)
  local.get $0
  i32.eqz
  if
   i32.const 0
   i32.const 5
   call $~lib/rt/stub/__new
   local.set $0
  end
  local.get $0
  if (result i32)
   local.get $0
  else
   i32.const 0
   i32.const 0
   call $~lib/rt/stub/__new
  end
 )
 (func $~lib/util/memory/memcpy (param $0 i32) (param $1 i32) (param $2 i32)
  (local $3 i32)
  (local $4 i32)
  (local $5 i32)
  loop $while-continue|0
   local.get $1
   i32.const 3
   i32.and
   i32.const 0
   local.get $2
   select
   if
    local.get $0
    local.tee $3
    i32.const 1
    i32.add
    local.set $0
    local.get $1
    local.tee $4
    i32.const 1
    i32.add
    local.set $1
    local.get $3
    local.get $4
    i32.load8_u
    i32.store8
    local.get $2
    i32.const 1
    i32.sub
    local.set $2
    br $while-continue|0
   end
  end
  local.get $0
  i32.const 3
  i32.and
  i32.eqz
  if
   loop $while-continue|1
    local.get $2
    i32.const 16
    i32.ge_u
    if
     local.get $0
     local.get $1
     i32.load
     i32.store
     local.get $0
     local.get $1
     i32.load offset=4
     i32.store offset=4
     local.get $0
     local.get $1
     i32.load offset=8
     i32.store offset=8
     local.get $0
     local.get $1
     i32.load offset=12
     i32.store offset=12
     local.get $1
     i32.const 16
     i32.add
     local.set $1
     local.get $0
     i32.const 16
     i32.add
     local.set $0
     local.get $2
     i32.const 16
     i32.sub
     local.set $2
     br $while-continue|1
    end
   end
   local.get $2
   i32.const 8
   i32.and
   if
    local.get $0
    local.get $1
    i32.load
    i32.store
    local.get $0
    local.get $1
    i32.load offset=4
    i32.store offset=4
    local.get $1
    i32.const 8
    i32.add
    local.set $1
    local.get $0
    i32.const 8
    i32.add
    local.set $0
   end
   local.get $2
   i32.const 4
   i32.and
   if
    local.get $0
    local.get $1
    i32.load
    i32.store
    local.get $1
    i32.const 4
    i32.add
    local.set $1
    local.get $0
    i32.const 4
    i32.add
    local.set $0
   end
   local.get $2
   i32.const 2
   i32.and
   if
    local.get $0
    local.get $1
    i32.load16_u
    i32.store16
    local.get $1
    i32.const 2
    i32.add
    local.set $1
    local.get $0
    i32.const 2
    i32.add
    local.set $0
   end
   local.get $2
   i32.const 1
   i32.and
   if
    local.get $0
    local.get $1
    i32.load8_u
    i32.store8
   end
   return
  end
  local.get $2
  i32.const 32
  i32.ge_u
  if
   block $break|2
    block $case2|2
     block $case1|2
      block $case0|2
       local.get $0
       i32.const 3
       i32.and
       i32.const 1
       i32.sub
       br_table $case0|2 $case1|2 $case2|2 $break|2
      end
      local.get $1
      i32.load
      local.set $5
      local.get $0
      local.get $1
      i32.load8_u
      i32.store8
      local.get $0
      local.get $1
      i32.load8_u offset=1
      i32.store8 offset=1
      local.get $0
      i32.const 2
      i32.add
      local.tee $3
      i32.const 1
      i32.add
      local.set $0
      local.get $1
      i32.const 2
      i32.add
      local.tee $4
      i32.const 1
      i32.add
      local.set $1
      local.get $3
      local.get $4
      i32.load8_u
      i32.store8
      local.get $2
      i32.const 3
      i32.sub
      local.set $2
      loop $while-continue|3
       local.get $2
       i32.const 17
       i32.ge_u
       if
        local.get $0
        local.get $1
        i32.load offset=1
        local.tee $3
        i32.const 8
        i32.shl
        local.get $5
        i32.const 24
        i32.shr_u
        i32.or
        i32.store
        local.get $0
        local.get $1
        i32.load offset=5
        local.tee $4
        i32.const 8
        i32.shl
        local.get $3
        i32.const 24
        i32.shr_u
        i32.or
        i32.store offset=4
        local.get $0
        local.get $1
        i32.load offset=9
        local.tee $3
        i32.const 8
        i32.shl
        local.get $4
        i32.const 24
        i32.shr_u
        i32.or
        i32.store offset=8
        local.get $0
        local.get $1
        i32.load offset=13
        local.tee $5
        i32.const 8
        i32.shl
        local.get $3
        i32.const 24
        i32.shr_u
        i32.or
        i32.store offset=12
        local.get $1
        i32.const 16
        i32.add
        local.set $1
        local.get $0
        i32.const 16
        i32.add
        local.set $0
        local.get $2
        i32.const 16
        i32.sub
        local.set $2
        br $while-continue|3
       end
      end
      br $break|2
     end
     local.get $1
     i32.load
     local.set $5
     local.get $0
     local.get $1
     i32.load8_u
     i32.store8
     local.get $0
     local.tee $3
     i32.const 2
     i32.add
     local.set $0
     local.get $1
     local.tee $4
     i32.const 2
     i32.add
     local.set $1
     local.get $3
     local.get $4
     i32.load8_u offset=1
     i32.store8 offset=1
     local.get $2
     i32.const 2
     i32.sub
     local.set $2
     loop $while-continue|4
      local.get $2
      i32.const 18
      i32.ge_u
      if
       local.get $0
       local.get $1
       i32.load offset=2
       local.tee $3
       i32.const 16
       i32.shl
       local.get $5
       i32.const 16
       i32.shr_u
       i32.or
       i32.store
       local.get $0
       local.get $1
       i32.load offset=6
       local.tee $4
       i32.const 16
       i32.shl
       local.get $3
       i32.const 16
       i32.shr_u
       i32.or
       i32.store offset=4
       local.get $0
       local.get $1
       i32.load offset=10
       local.tee $3
       i32.const 16
       i32.shl
       local.get $4
       i32.const 16
       i32.shr_u
       i32.or
       i32.store offset=8
       local.get $0
       local.get $1
       i32.load offset=14
       local.tee $5
       i32.const 16
       i32.shl
       local.get $3
       i32.const 16
       i32.shr_u
       i32.or
       i32.store offset=12
       local.get $1
       i32.const 16
       i32.add
       local.set $1
       local.get $0
       i32.const 16
       i32.add
       local.set $0
       local.get $2
       i32.const 16
       i32.sub
       local.set $2
       br $while-continue|4
      end
     end
     br $break|2
    end
    local.get $1
    i32.load
    local.set $5
    local.get $0
    local.tee $3
    i32.const 1
    i32.add
    local.set $0
    local.get $1
    local.tee $4
    i32.const 1
    i32.add
    local.set $1
    local.get $3
    local.get $4
    i32.load8_u
    i32.store8
    local.get $2
    i32.const 1
    i32.sub
    local.set $2
    loop $while-continue|5
     local.get $2
     i32.const 19
     i32.ge_u
     if
      local.get $0
      local.get $1
      i32.load offset=3
      local.tee $3
      i32.const 24
      i32.shl
      local.get $5
      i32.const 8
      i32.shr_u
      i32.or
      i32.store
      local.get $0
      local.get $1
      i32.load offset=7
      local.tee $4
      i32.const 24
      i32.shl
      local.get $3
      i32.const 8
      i32.shr_u
      i32.or
      i32.store offset=4
      local.get $0
      local.get $1
      i32.load offset=11
      local.tee $3
      i32.const 24
      i32.shl
      local.get $4
      i32.const 8
      i32.shr_u
      i32.or
      i32.store offset=8
      local.get $0
      local.get $1
      i32.load offset=15
      local.tee $5
      i32.const 24
      i32.shl
      local.get $3
      i32.const 8
      i32.shr_u
      i32.or
      i32.store offset=12
      local.get $1
      i32.const 16
      i32.add
      local.set $1
      local.get $0
      i32.const 16
      i32.add
      local.set $0
      local.get $2
      i32.const 16
      i32.sub
      local.set $2
      br $while-continue|5
     end
    end
   end
  end
  local.get $2
  i32.const 16
  i32.and
  if
   local.get $0
   local.get $1
   i32.load8_u
   i32.store8
   local.get $0
   local.get $1
   i32.load8_u offset=1
   i32.store8 offset=1
   local.get $0
   i32.const 2
   i32.add
   local.tee $0
   local.get $1
   i32.const 2
   i32.add
   local.tee $1
   i32.load8_u
   i32.store8
   local.get $0
   local.get $1
   i32.load8_u offset=1
   i32.store8 offset=1
   local.get $0
   i32.const 2
   i32.add
   local.tee $0
   local.get $1
   i32.const 2
   i32.add
   local.tee $1
   i32.load8_u
   i32.store8
   local.get $0
   local.get $1
   i32.load8_u offset=1
   i32.store8 offset=1
   local.get $0
   i32.const 2
   i32.add
   local.tee $0
   local.get $1
   i32.const 2
   i32.add
   local.tee $1
   i32.load8_u
   i32.store8
   local.get $0
   local.get $1
   i32.load8_u offset=1
   i32.store8 offset=1
   local.get $0
   i32.const 2
   i32.add
   local.tee $0
   local.get $1
   i32.const 2
   i32.add
   local.tee $1
   i32.load8_u
   i32.store8
   local.get $0
   local.get $1
   i32.load8_u offset=1
   i32.store8 offset=1
   local.get $0
   i32.const 2
   i32.add
   local.tee $0
   local.get $1
   i32.const 2
   i32.add
   local.tee $1
   i32.load8_u
   i32.store8
   local.get $0
   local.get $1
   i32.load8_u offset=1
   i32.store8 offset=1
   local.get $0
   i32.const 2
   i32.add
   local.tee $0
   local.get $1
   i32.const 2
   i32.add
   local.tee $1
   i32.load8_u
   i32.store8
   local.get $0
   local.get $1
   i32.load8_u offset=1
   i32.store8 offset=1
   local.get $0
   i32.const 2
   i32.add
   local.tee $0
   local.get $1
   i32.const 2
   i32.add
   local.tee $3
   i32.load8_u
   i32.store8
   local.get $3
   i32.const 2
   i32.add
   local.set $1
   local.get $0
   local.get $3
   i32.load8_u offset=1
   i32.store8 offset=1
   local.get $0
   i32.const 2
   i32.add
   local.set $0
  end
  local.get $2
  i32.const 8
  i32.and
  if
   local.get $0
   local.get $1
   i32.load8_u
   i32.store8
   local.get $0
   local.get $1
   i32.load8_u offset=1
   i32.store8 offset=1
   local.get $0
   i32.const 2
   i32.add
   local.tee $0
   local.get $1
   i32.const 2
   i32.add
   local.tee $1
   i32.load8_u
   i32.store8
   local.get $0
   local.get $1
   i32.load8_u offset=1
   i32.store8 offset=1
   local.get $0
   i32.const 2
   i32.add
   local.tee $0
   local.get $1
   i32.const 2
   i32.add
   local.tee $1
   i32.load8_u
   i32.store8
   local.get $0
   local.get $1
   i32.load8_u offset=1
   i32.store8 offset=1
   local.get $0
   i32.const 2
   i32.add
   local.tee $0
   local.get $1
   i32.const 2
   i32.add
   local.tee $3
   i32.load8_u
   i32.store8
   local.get $3
   i32.const 2
   i32.add
   local.set $1
   local.get $0
   local.get $3
   i32.load8_u offset=1
   i32.store8 offset=1
   local.get $0
   i32.const 2
   i32.add
   local.set $0
  end
  local.get $2
  i32.const 4
  i32.and
  if
   local.get $0
   local.get $1
   i32.load8_u
   i32.store8
   local.get $0
   local.get $1
   i32.load8_u offset=1
   i32.store8 offset=1
   local.get $0
   i32.const 2
   i32.add
   local.tee $0
   local.get $1
   i32.const 2
   i32.add
   local.tee $3
   i32.load8_u
   i32.store8
   local.get $3
   i32.const 2
   i32.add
   local.set $1
   local.get $0
   local.get $3
   i32.load8_u offset=1
   i32.store8 offset=1
   local.get $0
   i32.const 2
   i32.add
   local.set $0
  end
  local.get $2
  i32.const 2
  i32.and
  if
   local.get $0
   local.get $1
   i32.load8_u
   i32.store8
   local.get $0
   local.tee $3
   i32.const 2
   i32.add
   local.set $0
   local.get $1
   local.tee $4
   i32.const 2
   i32.add
   local.set $1
   local.get $3
   local.get $4
   i32.load8_u offset=1
   i32.store8 offset=1
  end
  local.get $2
  i32.const 1
  i32.and
  if
   local.get $0
   local.get $1
   i32.load8_u
   i32.store8
  end
 )
 (func $~lib/memory/memory.copy (param $0 i32) (param $1 i32) (param $2 i32)
  (local $3 i32)
  (local $4 i32)
  block $~lib/util/memory/memmove|inlined.0
   local.get $2
   local.set $4
   local.get $0
   local.get $1
   i32.eq
   br_if $~lib/util/memory/memmove|inlined.0
   local.get $1
   local.get $0
   i32.sub
   local.get $4
   i32.sub
   i32.const 0
   local.get $4
   i32.const 1
   i32.shl
   i32.sub
   i32.le_u
   if
    local.get $0
    local.get $1
    local.get $4
    call $~lib/util/memory/memcpy
    br $~lib/util/memory/memmove|inlined.0
   end
   local.get $0
   local.get $1
   i32.lt_u
   if
    local.get $1
    i32.const 7
    i32.and
    local.get $0
    i32.const 7
    i32.and
    i32.eq
    if
     loop $while-continue|0
      local.get $0
      i32.const 7
      i32.and
      if
       local.get $4
       i32.eqz
       br_if $~lib/util/memory/memmove|inlined.0
       local.get $4
       i32.const 1
       i32.sub
       local.set $4
       local.get $0
       local.tee $2
       i32.const 1
       i32.add
       local.set $0
       local.get $1
       local.tee $3
       i32.const 1
       i32.add
       local.set $1
       local.get $2
       local.get $3
       i32.load8_u
       i32.store8
       br $while-continue|0
      end
     end
     loop $while-continue|1
      local.get $4
      i32.const 8
      i32.ge_u
      if
       local.get $0
       local.get $1
       i64.load
       i64.store
       local.get $4
       i32.const 8
       i32.sub
       local.set $4
       local.get $0
       i32.const 8
       i32.add
       local.set $0
       local.get $1
       i32.const 8
       i32.add
       local.set $1
       br $while-continue|1
      end
     end
    end
    loop $while-continue|2
     local.get $4
     if
      local.get $0
      local.tee $2
      i32.const 1
      i32.add
      local.set $0
      local.get $1
      local.tee $3
      i32.const 1
      i32.add
      local.set $1
      local.get $2
      local.get $3
      i32.load8_u
      i32.store8
      local.get $4
      i32.const 1
      i32.sub
      local.set $4
      br $while-continue|2
     end
    end
   else
    local.get $1
    i32.const 7
    i32.and
    local.get $0
    i32.const 7
    i32.and
    i32.eq
    if
     loop $while-continue|3
      local.get $0
      local.get $4
      i32.add
      i32.const 7
      i32.and
      if
       local.get $4
       i32.eqz
       br_if $~lib/util/memory/memmove|inlined.0
       local.get $0
       local.get $4
       i32.const 1
       i32.sub
       local.tee $4
       i32.add
       local.get $1
       local.get $4
       i32.add
       i32.load8_u
       i32.store8
       br $while-continue|3
      end
     end
     loop $while-continue|4
      local.get $4
      i32.const 8
      i32.ge_u
      if
       local.get $0
       local.get $4
       i32.const 8
       i32.sub
       local.tee $4
       i32.add
       local.get $1
       local.get $4
       i32.add
       i64.load
       i64.store
       br $while-continue|4
      end
     end
    end
    loop $while-continue|5
     local.get $4
     if
      local.get $0
      local.get $4
      i32.const 1
      i32.sub
      local.tee $4
      i32.add
      local.get $1
      local.get $4
      i32.add
      i32.load8_u
      i32.store8
      br $while-continue|5
     end
    end
   end
  end
 )
 (func $~lib/rt/__newArray (param $0 i32) (param $1 i32) (result i32)
  (local $2 i32)
  i32.const 0
  i32.const 1
  call $~lib/rt/stub/__new
  local.set $2
  local.get $1
  if
   local.get $2
   local.get $1
   i32.const 0
   call $~lib/memory/memory.copy
  end
  i32.const 16
  local.get $0
  call $~lib/rt/stub/__new
  local.tee $0
  local.get $2
  i32.store
  local.get $0
  local.get $2
  i32.store offset=4
  local.get $0
  i32.const 0
  i32.store offset=8
  local.get $0
  i32.const 0
  i32.store offset=12
  local.get $0
 )
 (func $~lib/memory/memory.fill (param $0 i32) (param $1 i32) (param $2 i32)
  (local $3 i64)
  (local $4 i32)
  (local $5 i32)
  block $~lib/util/memory/memset|inlined.0
   local.get $2
   i32.eqz
   br_if $~lib/util/memory/memset|inlined.0
   local.get $0
   local.get $1
   i32.store8
   local.get $0
   local.get $2
   i32.add
   local.tee $4
   i32.const 1
   i32.sub
   local.get $1
   i32.store8
   local.get $2
   i32.const 2
   i32.le_u
   br_if $~lib/util/memory/memset|inlined.0
   local.get $0
   local.get $1
   i32.store8 offset=1
   local.get $0
   local.get $1
   i32.store8 offset=2
   local.get $4
   i32.const 2
   i32.sub
   local.get $1
   i32.store8
   local.get $4
   i32.const 3
   i32.sub
   local.get $1
   i32.store8
   local.get $2
   i32.const 6
   i32.le_u
   br_if $~lib/util/memory/memset|inlined.0
   local.get $0
   local.get $1
   i32.store8 offset=3
   local.get $4
   i32.const 4
   i32.sub
   local.get $1
   i32.store8
   local.get $2
   i32.const 8
   i32.le_u
   br_if $~lib/util/memory/memset|inlined.0
   i32.const 0
   local.get $0
   i32.sub
   i32.const 3
   i32.and
   local.tee $4
   local.get $0
   i32.add
   local.tee $5
   local.get $1
   i32.const 255
   i32.and
   i32.const 16843009
   i32.mul
   local.tee $0
   i32.store
   local.get $2
   local.get $4
   i32.sub
   i32.const -4
   i32.and
   local.tee $2
   local.get $5
   i32.add
   local.tee $1
   i32.const 4
   i32.sub
   local.get $0
   i32.store
   local.get $2
   i32.const 8
   i32.le_u
   br_if $~lib/util/memory/memset|inlined.0
   local.get $5
   local.get $0
   i32.store offset=4
   local.get $5
   local.get $0
   i32.store offset=8
   local.get $1
   i32.const 12
   i32.sub
   local.get $0
   i32.store
   local.get $1
   i32.const 8
   i32.sub
   local.get $0
   i32.store
   local.get $2
   i32.const 24
   i32.le_u
   br_if $~lib/util/memory/memset|inlined.0
   local.get $5
   local.get $0
   i32.store offset=12
   local.get $5
   local.get $0
   i32.store offset=16
   local.get $5
   local.get $0
   i32.store offset=20
   local.get $5
   local.get $0
   i32.store offset=24
   local.get $1
   i32.const 28
   i32.sub
   local.get $0
   i32.store
   local.get $1
   i32.const 24
   i32.sub
   local.get $0
   i32.store
   local.get $1
   i32.const 20
   i32.sub
   local.get $0
   i32.store
   local.get $1
   i32.const 16
   i32.sub
   local.get $0
   i32.store
   local.get $5
   i32.const 4
   i32.and
   i32.const 24
   i32.add
   local.tee $4
   local.get $5
   i32.add
   local.set $1
   local.get $2
   local.get $4
   i32.sub
   local.set $2
   local.get $0
   i64.extend_i32_u
   local.tee $3
   i64.const 32
   i64.shl
   local.get $3
   i64.or
   local.set $3
   loop $while-continue|0
    local.get $2
    i32.const 32
    i32.ge_u
    if
     local.get $1
     local.get $3
     i64.store
     local.get $1
     local.get $3
     i64.store offset=8
     local.get $1
     local.get $3
     i64.store offset=16
     local.get $1
     local.get $3
     i64.store offset=24
     local.get $2
     i32.const 32
     i32.sub
     local.set $2
     local.get $1
     i32.const 32
     i32.add
     local.set $1
     br $while-continue|0
    end
   end
  end
 )
 (func $~lib/arraybuffer/ArrayBufferView#constructor (param $0 i32) (param $1 i32) (param $2 i32) (result i32)
  local.get $0
  i32.eqz
  if
   i32.const 12
   i32.const 3
   call $~lib/rt/stub/__new
   local.set $0
  end
  local.get $0
  i32.const 0
  i32.store
  local.get $0
  i32.const 0
  i32.store offset=4
  local.get $0
  i32.const 0
  i32.store offset=8
  local.get $1
  i32.const 1073741820
  local.get $2
  i32.shr_u
  i32.gt_u
  if
   i32.const 1280
   i32.const 1328
   i32.const 19
   i32.const 57
   call $~lib/builtins/abort
   unreachable
  end
  local.get $1
  local.get $2
  i32.shl
  local.tee $1
  i32.const 1
  call $~lib/rt/stub/__new
  local.tee $2
  i32.const 0
  local.get $1
  call $~lib/memory/memory.fill
  local.get $0
  local.get $2
  i32.store
  local.get $0
  local.get $2
  i32.store offset=4
  local.get $0
  local.get $1
  i32.store offset=8
  local.get $0
 )
 (func $~lib/error/Error#constructor (param $0 i32)
  (local $1 i32)
  i32.const 12
  i32.const 13
  call $~lib/rt/stub/__new
  local.tee $1
  local.get $0
  i32.store offset=8
  local.get $1
  i32.const 1392
  i32.store
  local.get $1
  i32.const 1424
  i32.store offset=4
 )
 (func $~lib/@artela/aspect-libs/hostapi/crypto-api/CryptoApi.instance
  global.get $~lib/@artela/aspect-libs/hostapi/crypto-api/CryptoApi._ins
  i32.eqz
  if
   i32.const 0
   i32.const 14
   call $~lib/rt/stub/__new
   global.set $~lib/@artela/aspect-libs/hostapi/crypto-api/CryptoApi._ins
  end
  global.get $~lib/@artela/aspect-libs/hostapi/crypto-api/CryptoApi._ins
  i32.eqz
  if
   i32.const 2112
   i32.const 2240
   i32.const 22
   i32.const 12
   call $~lib/builtins/abort
   unreachable
  end
 )
 (func $~lib/@artela/aspect-libs/hostapi/runtime-api/RuntimeContextApi.instance
  global.get $~lib/@artela/aspect-libs/hostapi/runtime-api/RuntimeContextApi._instance
  i32.eqz
  if
   i32.const 0
   i32.const 21
   call $~lib/rt/stub/__new
   global.set $~lib/@artela/aspect-libs/hostapi/runtime-api/RuntimeContextApi._instance
  end
  global.get $~lib/@artela/aspect-libs/hostapi/runtime-api/RuntimeContextApi._instance
  i32.eqz
  if
   i32.const 2112
   i32.const 2352
   i32.const 16
   i32.const 12
   call $~lib/builtins/abort
   unreachable
  end
 )
 (func $~lib/@artela/aspect-libs/hostapi/aspect-state-api/AspectStateApi.instance
  global.get $~lib/@artela/aspect-libs/hostapi/aspect-state-api/AspectStateApi._instance
  i32.eqz
  if
   i32.const 0
   i32.const 17
   call $~lib/rt/stub/__new
   global.set $~lib/@artela/aspect-libs/hostapi/aspect-state-api/AspectStateApi._instance
  end
  global.get $~lib/@artela/aspect-libs/hostapi/aspect-state-api/AspectStateApi._instance
  i32.eqz
  if
   i32.const 2112
   i32.const 2480
   i32.const 19
   i32.const 12
   call $~lib/builtins/abort
   unreachable
  end
 )
 (func $~lib/@artela/aspect-libs/hostapi/aspect-property-api/AspectPropertyApi.instance
  global.get $~lib/@artela/aspect-libs/hostapi/aspect-property-api/AspectPropertyApi._instance
  i32.eqz
  if
   i32.const 0
   i32.const 15
   call $~lib/rt/stub/__new
   global.set $~lib/@artela/aspect-libs/hostapi/aspect-property-api/AspectPropertyApi._instance
  end
  global.get $~lib/@artela/aspect-libs/hostapi/aspect-property-api/AspectPropertyApi._instance
  i32.eqz
  if
   i32.const 2112
   i32.const 2608
   i32.const 16
   i32.const 12
   call $~lib/builtins/abort
   unreachable
  end
 )
 (func $~lib/@artela/aspect-libs/hostapi/aspect-transient-storage-api/AspectTransientStorageApi.instance
  global.get $~lib/@artela/aspect-libs/hostapi/aspect-transient-storage-api/AspectTransientStorageApi._instance
  i32.eqz
  if
   i32.const 0
   i32.const 19
   call $~lib/rt/stub/__new
   global.set $~lib/@artela/aspect-libs/hostapi/aspect-transient-storage-api/AspectTransientStorageApi._instance
  end
  global.get $~lib/@artela/aspect-libs/hostapi/aspect-transient-storage-api/AspectTransientStorageApi._instance
  i32.eqz
  if
   i32.const 2112
   i32.const 2752
   i32.const 18
   i32.const 12
   call $~lib/builtins/abort
   unreachable
  end
 )
 (func $~lib/@artela/aspect-libs/hostapi/util-api/UtilApi.instance
  global.get $~lib/@artela/aspect-libs/hostapi/util-api/UtilApi._instance
  i32.eqz
  if
   i32.const 0
   i32.const 16
   call $~lib/rt/stub/__new
   global.set $~lib/@artela/aspect-libs/hostapi/util-api/UtilApi._instance
  end
  global.get $~lib/@artela/aspect-libs/hostapi/util-api/UtilApi._instance
  i32.eqz
  if
   i32.const 2112
   i32.const 3168
   i32.const 18
   i32.const 12
   call $~lib/builtins/abort
   unreachable
  end
 )
 (func $start:~lib/@artela/aspect-libs/types/aspect-entry
  (local $0 i32)
  (local $1 i32)
  i32.const 9516
  global.set $~lib/rt/stub/offset
  i32.const 16
  i32.const 4
  call $~lib/rt/stub/__new
  local.tee $0
  i32.const 0
  i32.store
  local.get $0
  i32.const 0
  i32.store offset=4
  local.get $0
  i32.const 0
  i32.store offset=8
  local.get $0
  i32.const 0
  i32.store offset=12
  local.get $0
  call $~lib/as-proto/assembly/Writer/Writer#constructor
  local.set $0
  i32.const 16
  i32.const 6
  call $~lib/rt/stub/__new
  local.tee $1
  i32.const 0
  i32.store
  local.get $1
  i32.const 0
  i32.store offset=4
  local.get $1
  i32.const 0
  i32.store offset=8
  local.get $1
  i32.const 0
  i32.store offset=12
  local.get $1
  call $~lib/as-proto/assembly/Writer/Writer#constructor
  local.tee $1
  i32.const 0
  i32.store
  local.get $1
  i32.const 7
  i32.const 1184
  call $~lib/rt/__newArray
  i32.store offset=4
  local.get $1
  i32.const 8
  i32.const 1216
  call $~lib/rt/__newArray
  i32.store offset=8
  local.get $1
  i32.const 8
  i32.const 1248
  call $~lib/rt/__newArray
  i32.store offset=12
  local.get $0
  local.get $1
  i32.store
  local.get $1
  i32.load
  local.set $1
  local.get $0
  i32.const 12
  i32.const 9
  call $~lib/rt/stub/__new
  local.get $1
  i32.const 0
  call $~lib/arraybuffer/ArrayBufferView#constructor
  local.tee $1
  i32.store offset=8
  local.get $0
  local.get $1
  i32.load offset=4
  i32.store offset=4
  local.get $0
  i32.const 0
  i32.store offset=12
  i32.const 12
  i32.const 9
  call $~lib/rt/stub/__new
  i32.const 0
  i32.const 0
  call $~lib/arraybuffer/ArrayBufferView#constructor
  local.set $1
  i32.const 12
  i32.const 10
  call $~lib/rt/stub/__new
  local.tee $0
  i32.const 0
  i32.store offset=8
  local.get $0
  i32.eqz
  if
   i32.const 8
   i32.const 11
   call $~lib/rt/stub/__new
   local.set $0
  end
  local.get $0
  i32.eqz
  if
   i32.const 0
   i32.const 0
   call $~lib/rt/stub/__new
   local.set $0
  end
  local.get $0
  i32.const 0
  i32.store
  local.get $0
  i32.const 0
  i32.store offset=4
  local.get $0
  local.get $1
  i32.load offset=4
  i32.store
  local.get $0
  local.get $1
  i32.load offset=4
  local.get $1
  i32.load offset=8
  i32.add
  i32.store offset=4
  local.get $0
  local.get $1
  i32.store offset=8
  local.get $0
  global.set $~lib/as-proto/assembly/Protobuf/READER
  i32.const 1456
  call $~lib/error/Error#constructor
  i32.const 1552
  call $~lib/error/Error#constructor
  i32.const 1632
  call $~lib/error/Error#constructor
  i32.const 1712
  call $~lib/error/Error#constructor
  i32.const 1808
  call $~lib/error/Error#constructor
  i32.const 1904
  call $~lib/error/Error#constructor
  i32.const 1984
  call $~lib/error/Error#constructor
  call $~lib/@artela/aspect-libs/hostapi/crypto-api/CryptoApi.instance
  call $~lib/@artela/aspect-libs/hostapi/runtime-api/RuntimeContextApi.instance
  call $~lib/@artela/aspect-libs/hostapi/aspect-state-api/AspectStateApi.instance
  call $~lib/@artela/aspect-libs/hostapi/aspect-property-api/AspectPropertyApi.instance
  call $~lib/@artela/aspect-libs/hostapi/aspect-transient-storage-api/AspectTransientStorageApi.instance
  global.get $~lib/@artela/aspect-libs/hostapi/evm-call-api/EvmCallApi._instance
  i32.eqz
  if
   i32.const 0
   i32.const 20
   call $~lib/rt/stub/__new
   global.set $~lib/@artela/aspect-libs/hostapi/evm-call-api/EvmCallApi._instance
  end
  global.get $~lib/@artela/aspect-libs/hostapi/evm-call-api/EvmCallApi._instance
  i32.eqz
  if
   i32.const 2112
   i32.const 2912
   i32.const 117
   i32.const 12
   call $~lib/builtins/abort
   unreachable
  end
  call $~lib/@artela/aspect-libs/hostapi/runtime-api/RuntimeContextApi.instance
  call $~lib/@artela/aspect-libs/hostapi/crypto-api/CryptoApi.instance
  global.get $~lib/@artela/aspect-libs/hostapi/statedb-api/StateDbApi._instance
  i32.eqz
  if
   i32.const 0
   i32.const 22
   call $~lib/rt/stub/__new
   global.set $~lib/@artela/aspect-libs/hostapi/statedb-api/StateDbApi._instance
  end
  global.get $~lib/@artela/aspect-libs/hostapi/statedb-api/StateDbApi._instance
  i32.eqz
  if
   i32.const 2112
   i32.const 3040
   i32.const 95
   i32.const 12
   call $~lib/builtins/abort
   unreachable
  end
  call $~lib/@artela/aspect-libs/hostapi/util-api/UtilApi.instance
  call $~lib/@artela/aspect-libs/hostapi/aspect-state-api/AspectStateApi.instance
  call $~lib/@artela/aspect-libs/hostapi/aspect-property-api/AspectPropertyApi.instance
  call $~lib/@artela/aspect-libs/hostapi/aspect-transient-storage-api/AspectTransientStorageApi.instance
  global.get $~lib/@artela/aspect-libs/hostapi/trace-api/TraceApi._instance
  i32.eqz
  if
   i32.const 0
   i32.const 18
   call $~lib/rt/stub/__new
   global.set $~lib/@artela/aspect-libs/hostapi/trace-api/TraceApi._instance
  end
  global.get $~lib/@artela/aspect-libs/hostapi/trace-api/TraceApi._instance
  i32.eqz
  if
   i32.const 2112
   i32.const 3280
   i32.const 19
   i32.const 12
   call $~lib/builtins/abort
   unreachable
  end
  global.get $~lib/@artela/aspect-libs/components/aspect/aspect-state/MutableAspectState._instance
  i32.eqz
  if
   i32.const 0
   i32.const 24
   call $~lib/rt/stub/__new
   global.set $~lib/@artela/aspect-libs/components/aspect/aspect-state/MutableAspectState._instance
  end
  global.get $~lib/@artela/aspect-libs/components/aspect/aspect-state/MutableAspectState._instance
  i32.eqz
  if
   i32.const 2112
   i32.const 3392
   i32.const 20
   i32.const 12
   call $~lib/builtins/abort
   unreachable
  end
  global.get $~lib/@artela/aspect-libs/components/aspect/aspect-state/ImmutableAspectState._instance
  i32.eqz
  if
   i32.const 0
   i32.const 25
   call $~lib/rt/stub/__new
   global.set $~lib/@artela/aspect-libs/components/aspect/aspect-state/ImmutableAspectState._instance
  end
  global.get $~lib/@artela/aspect-libs/components/aspect/aspect-state/ImmutableAspectState._instance
  i32.eqz
  if
   i32.const 2112
   i32.const 3392
   i32.const 37
   i32.const 12
   call $~lib/builtins/abort
   unreachable
  end
  global.get $~lib/@artela/aspect-libs/components/aspect/aspect-property/AspectProperty._instance
  i32.eqz
  if
   i32.const 0
   i32.const 26
   call $~lib/rt/stub/__new
   global.set $~lib/@artela/aspect-libs/components/aspect/aspect-property/AspectProperty._instance
  end
  global.get $~lib/@artela/aspect-libs/components/aspect/aspect-property/AspectProperty._instance
  i32.eqz
  if
   i32.const 2112
   i32.const 3536
   i32.const 19
   i32.const 12
   call $~lib/builtins/abort
   unreachable
  end
  global.get $~lib/@artela/aspect-libs/components/aspect/aspect-transient-storage/TransientStorage._instance
  i32.eqz
  if
   i32.const 0
   i32.const 27
   call $~lib/rt/stub/__new
   global.set $~lib/@artela/aspect-libs/components/aspect/aspect-transient-storage/TransientStorage._instance
  end
  global.get $~lib/@artela/aspect-libs/components/aspect/aspect-transient-storage/TransientStorage._instance
  i32.eqz
  if
   i32.const 2112
   i32.const 3680
   i32.const 20
   i32.const 12
   call $~lib/builtins/abort
   unreachable
  end
  global.get $~lib/@artela/aspect-libs/common/helper/message/MessageUtil._instance
  i32.eqz
  if
   i32.const 24
   i32.const 12
   call $~lib/rt/stub/__new
   local.tee $0
   i32.const 4640
   i32.store
   local.get $0
   i32.const 4704
   i32.store offset=4
   local.get $0
   i32.const 4768
   i32.store offset=8
   local.get $0
   i32.const 4832
   i32.store offset=12
   local.get $0
   i32.const 4896
   i32.store offset=16
   local.get $0
   i32.const 4976
   i32.store offset=20
   local.get $0
   global.set $~lib/@artela/aspect-libs/common/helper/message/MessageUtil._instance
  end
  global.get $~lib/@artela/aspect-libs/common/helper/message/MessageUtil._instance
  i32.eqz
  if
   i32.const 2112
   i32.const 5056
   i32.const 14
   i32.const 12
   call $~lib/builtins/abort
   unreachable
  end
 )
 (func $~lib/@artela/aspect-libs/common/wraptypes/basic-types/header#constructor (param $0 i32) (param $1 i32) (result i32)
  (local $2 i32)
  i32.const 8
  i32.const 34
  call $~lib/rt/stub/__new
  local.tee $2
  i32.const 0
  i32.store16
  local.get $2
  i32.const 0
  i32.store offset=4
  local.get $2
  local.get $0
  i32.store16
  local.get $2
  local.get $1
  i32.store offset=4
  local.get $2
 )
 (func $~lib/@artela/aspect-libs/common/wraptypes/basic-types/AString#constructor (result i32)
  (local $0 i32)
  (local $1 i32)
  (local $2 i32)
  (local $3 i32)
  (local $4 i32)
  i32.const 8
  i32.const 33
  call $~lib/rt/stub/__new
  local.tee $2
  i32.const 0
  i32.store
  local.get $2
  i32.const 0
  i32.store offset=4
  local.get $2
  i32.const 1424
  i32.store offset=4
  i32.const 1424
  local.set $0
  i32.const 1420
  i32.load
  i32.const 1424
  i32.add
  local.set $3
  loop $while-continue|0
   local.get $0
   local.get $3
   i32.lt_u
   if
    local.get $0
    i32.load16_u
    local.tee $4
    i32.const 128
    i32.lt_u
    if (result i32)
     local.get $1
     i32.const 1
     i32.add
    else
     local.get $4
     i32.const 2048
     i32.lt_u
     if (result i32)
      local.get $1
      i32.const 2
      i32.add
     else
      local.get $4
      i32.const 64512
      i32.and
      i32.const 55296
      i32.eq
      local.get $0
      i32.const 2
      i32.add
      local.get $3
      i32.lt_u
      i32.and
      if
       local.get $0
       i32.load16_u offset=2
       i32.const 64512
       i32.and
       i32.const 56320
       i32.eq
       if
        local.get $1
        i32.const 4
        i32.add
        local.set $1
        local.get $0
        i32.const 4
        i32.add
        local.set $0
        br $while-continue|0
       end
      end
      local.get $1
      i32.const 3
      i32.add
     end
    end
    local.set $1
    local.get $0
    i32.const 2
    i32.add
    local.set $0
    br $while-continue|0
   end
  end
  local.get $2
  i32.const 10
  local.get $1
  call $~lib/@artela/aspect-libs/common/wraptypes/basic-types/header#constructor
  i32.store
  local.get $2
 )
 (func $~lib/rt/stub/__renew (param $0 i32) (param $1 i32) (result i32)
  (local $2 i32)
  (local $3 i32)
  (local $4 i32)
  (local $5 i32)
  (local $6 i32)
  local.get $1
  i32.const 1073741804
  i32.gt_u
  if
   i32.const 1056
   i32.const 1120
   i32.const 99
   i32.const 30
   call $~lib/builtins/abort
   unreachable
  end
  local.get $0
  i32.const 16
  i32.sub
  local.tee $0
  i32.const 15
  i32.and
  i32.const 1
  local.get $0
  select
  if
   i32.const 0
   i32.const 1120
   i32.const 45
   i32.const 3
   call $~lib/builtins/abort
   unreachable
  end
  global.get $~lib/rt/stub/offset
  local.get $0
  i32.const 4
  i32.sub
  local.tee $3
  i32.load
  local.tee $4
  local.get $0
  i32.add
  i32.eq
  local.set $5
  local.get $1
  i32.const 16
  i32.add
  local.tee $6
  i32.const 19
  i32.add
  i32.const -16
  i32.and
  i32.const 4
  i32.sub
  local.set $2
  local.get $4
  local.get $6
  i32.lt_u
  if
   local.get $5
   if
    local.get $6
    i32.const 1073741820
    i32.gt_u
    if
     i32.const 1056
     i32.const 1120
     i32.const 52
     i32.const 33
     call $~lib/builtins/abort
     unreachable
    end
    local.get $0
    local.get $2
    i32.add
    local.tee $4
    memory.size
    local.tee $5
    i32.const 16
    i32.shl
    i32.const 15
    i32.add
    i32.const -16
    i32.and
    local.tee $6
    i32.gt_u
    if
     local.get $5
     local.get $4
     local.get $6
     i32.sub
     i32.const 65535
     i32.add
     i32.const -65536
     i32.and
     i32.const 16
     i32.shr_u
     local.tee $6
     local.get $5
     local.get $6
     i32.gt_s
     select
     memory.grow
     i32.const 0
     i32.lt_s
     if
      local.get $6
      memory.grow
      i32.const 0
      i32.lt_s
      if
       unreachable
      end
     end
    end
    local.get $4
    global.set $~lib/rt/stub/offset
    local.get $3
    local.get $2
    i32.store
   else
    local.get $2
    local.get $4
    i32.const 1
    i32.shl
    local.tee $3
    local.get $2
    local.get $3
    i32.gt_u
    select
    call $~lib/rt/stub/__alloc
    local.tee $2
    local.get $0
    local.get $4
    call $~lib/memory/memory.copy
    local.get $2
    local.set $0
   end
  else
   local.get $5
   if
    local.get $0
    local.get $2
    i32.add
    global.set $~lib/rt/stub/offset
    local.get $3
    local.get $2
    i32.store
   end
  end
  local.get $0
  i32.const 4
  i32.sub
  local.get $1
  i32.store offset=16
  local.get $0
  i32.const 16
  i32.add
 )
 (func $~lib/string/String.UTF8.decodeUnsafe (param $0 i32) (param $1 i32) (result i32)
  (local $2 i32)
  (local $3 i32)
  (local $4 i32)
  (local $5 i32)
  (local $6 i32)
  local.get $0
  local.get $1
  i32.add
  local.tee $3
  local.get $0
  i32.lt_u
  if
   i32.const 0
   i32.const 5184
   i32.const 770
   i32.const 7
   call $~lib/builtins/abort
   unreachable
  end
  local.get $1
  i32.const 1
  i32.shl
  i32.const 2
  call $~lib/rt/stub/__new
  local.tee $4
  local.set $1
  loop $while-continue|0
   local.get $0
   local.get $3
   i32.lt_u
   if
    block $while-break|0
     local.get $0
     i32.load8_u
     local.set $5
     local.get $0
     i32.const 1
     i32.add
     local.set $0
     local.get $5
     i32.const 128
     i32.and
     if
      local.get $0
      local.get $3
      i32.eq
      br_if $while-break|0
      local.get $0
      i32.load8_u
      i32.const 63
      i32.and
      local.set $6
      local.get $0
      i32.const 1
      i32.add
      local.set $0
      local.get $5
      i32.const 224
      i32.and
      i32.const 192
      i32.eq
      if
       local.get $1
       local.get $5
       i32.const 31
       i32.and
       i32.const 6
       i32.shl
       local.get $6
       i32.or
       i32.store16
      else
       local.get $0
       local.get $3
       i32.eq
       br_if $while-break|0
       local.get $0
       i32.load8_u
       i32.const 63
       i32.and
       local.set $2
       local.get $0
       i32.const 1
       i32.add
       local.set $0
       local.get $5
       i32.const 240
       i32.and
       i32.const 224
       i32.eq
       if
        local.get $5
        i32.const 15
        i32.and
        i32.const 12
        i32.shl
        local.get $6
        i32.const 6
        i32.shl
        i32.or
        local.get $2
        i32.or
        local.set $2
       else
        local.get $0
        local.get $3
        i32.eq
        br_if $while-break|0
        local.get $0
        i32.load8_u
        i32.const 63
        i32.and
        local.get $5
        i32.const 7
        i32.and
        i32.const 18
        i32.shl
        local.get $6
        i32.const 12
        i32.shl
        i32.or
        local.get $2
        i32.const 6
        i32.shl
        i32.or
        i32.or
        local.set $2
        local.get $0
        i32.const 1
        i32.add
        local.set $0
       end
       local.get $2
       i32.const 65536
       i32.lt_u
       if
        local.get $1
        local.get $2
        i32.store16
       else
        local.get $1
        local.get $2
        i32.const 65536
        i32.sub
        local.tee $2
        i32.const 10
        i32.shr_u
        i32.const 55296
        i32.or
        local.get $2
        i32.const 1023
        i32.and
        i32.const 56320
        i32.or
        i32.const 16
        i32.shl
        i32.or
        i32.store
        local.get $1
        i32.const 2
        i32.add
        local.set $1
       end
      end
     else
      local.get $1
      local.get $5
      i32.store16
     end
     local.get $1
     i32.const 2
     i32.add
     local.set $1
     br $while-continue|0
    end
   end
  end
  local.get $4
  local.get $1
  local.get $4
  i32.sub
  call $~lib/rt/stub/__renew
 )
 (func $~lib/string/String.__eq (param $0 i32) (param $1 i32) (result i32)
  (local $2 i32)
  (local $3 i32)
  (local $4 i32)
  (local $5 i32)
  local.get $0
  local.get $1
  i32.eq
  if
   i32.const 1
   return
  end
  local.get $1
  i32.eqz
  local.get $0
  i32.eqz
  i32.or
  if
   i32.const 0
   return
  end
  local.get $0
  i32.const 20
  i32.sub
  i32.load offset=16
  i32.const 1
  i32.shr_u
  local.tee $3
  local.get $1
  i32.const 20
  i32.sub
  i32.load offset=16
  i32.const 1
  i32.shr_u
  i32.ne
  if
   i32.const 0
   return
  end
  local.get $0
  local.set $2
  local.get $3
  local.tee $0
  i32.const 4
  i32.ge_u
  if (result i32)
   local.get $2
   i32.const 7
   i32.and
   local.get $1
   i32.const 7
   i32.and
   i32.or
  else
   i32.const 1
  end
  i32.eqz
  if
   loop $do-loop|0
    local.get $2
    i64.load
    local.get $1
    i64.load
    i64.eq
    if
     local.get $2
     i32.const 8
     i32.add
     local.set $2
     local.get $1
     i32.const 8
     i32.add
     local.set $1
     local.get $0
     i32.const 4
     i32.sub
     local.tee $0
     i32.const 4
     i32.ge_u
     br_if $do-loop|0
    end
   end
  end
  block $__inlined_func$~lib/util/string/compareImpl$82
   loop $while-continue|1
    local.get $0
    local.tee $3
    i32.const 1
    i32.sub
    local.set $0
    local.get $3
    if
     local.get $2
     i32.load16_u
     local.tee $5
     local.get $1
     i32.load16_u
     local.tee $4
     i32.sub
     local.set $3
     local.get $4
     local.get $5
     i32.ne
     br_if $__inlined_func$~lib/util/string/compareImpl$82
     local.get $2
     i32.const 2
     i32.add
     local.set $2
     local.get $1
     i32.const 2
     i32.add
     local.set $1
     br $while-continue|1
    end
   end
   i32.const 0
   local.set $3
  end
  local.get $3
  i32.eqz
 )
 (func $~lib/@artela/aspect-libs/common/wraptypes/basic-types/AUint8Array#constructor@varargs (result i32)
  (local $0 i32)
  (local $1 i32)
  block $1of1
   block $0of1
    block $outOfRange
     global.get $~argumentsLength
     br_table $0of1 $1of1 $outOfRange
    end
    unreachable
   end
   i32.const 12
   i32.const 9
   call $~lib/rt/stub/__new
   i32.const 0
   i32.const 0
   call $~lib/arraybuffer/ArrayBufferView#constructor
   local.set $1
  end
  i32.const 8
  i32.const 35
  call $~lib/rt/stub/__new
  local.tee $0
  i32.const 0
  i32.store
  local.get $0
  i32.const 0
  i32.store offset=4
  local.get $0
  local.get $1
  i32.store offset=4
  local.get $0
  i32.const 11
  local.get $1
  i32.load offset=8
  call $~lib/@artela/aspect-libs/common/wraptypes/basic-types/header#constructor
  i32.store
  local.get $0
 )
 (func $~lib/typedarray/Uint8Array#__set (param $0 i32) (param $1 i32) (param $2 i32)
  local.get $1
  local.get $0
  i32.load offset=8
  i32.ge_u
  if
   i32.const 5232
   i32.const 5296
   i32.const 178
   i32.const 45
   call $~lib/builtins/abort
   unreachable
  end
  local.get $0
  i32.load offset=4
  local.get $1
  i32.add
  local.get $2
  i32.store8
 )
 (func $~lib/@artela/aspect-libs/common/wraptypes/basic-types/AUint8Array#load (param $0 i32) (param $1 i32)
  (local $2 i32)
  (local $3 i32)
  local.get $0
  i32.const 0
  i32.const 0
  call $~lib/@artela/aspect-libs/common/wraptypes/basic-types/header#constructor
  i32.store
  local.get $0
  i32.load
  local.tee $3
  local.get $1
  i32.load16_s
  i32.store16
  local.get $3
  local.get $1
  i32.load offset=2
  i32.store offset=4
  local.get $0
  i32.load
  drop
  local.get $1
  i32.const 6
  i32.add
  local.set $1
  local.get $0
  i32.load
  i32.load offset=4
  local.set $3
  local.get $0
  i32.const 12
  i32.const 9
  call $~lib/rt/stub/__new
  local.get $3
  i32.const 0
  call $~lib/arraybuffer/ArrayBufferView#constructor
  i32.store offset=4
  loop $for-loop|0
   local.get $2
   local.get $0
   i32.load
   i32.load offset=4
   i32.lt_s
   if
    local.get $0
    i32.load offset=4
    local.get $2
    local.get $1
    i32.load8_u
    call $~lib/typedarray/Uint8Array#__set
    local.get $1
    i32.const 1
    i32.add
    local.set $1
    local.get $2
    i32.const 1
    i32.add
    local.set $2
    br $for-loop|0
   end
  end
 )
 (func $~lib/@artela/aspect-libs/proto/aspect/v2/block-input/BlockInput.decode (param $0 i32) (param $1 i32) (result i32)
  (local $2 i32)
  (local $3 i64)
  (local $4 i32)
  local.get $1
  i32.const 0
  i32.lt_s
  if (result i32)
   local.get $0
   i32.load offset=4
  else
   local.get $0
   i32.load
   local.get $1
   i32.add
  end
  local.set $2
  i32.const 8
  i32.const 39
  call $~lib/rt/stub/__new
  local.tee $4
  i64.const 0
  i64.store
  local.get $4
  i64.const 0
  i64.store
  loop $while-continue|0
   local.get $0
   i32.load
   local.get $2
   i32.lt_u
   if
    block $__inlined_func$~lib/as-proto/assembly/Reader/Reader#uint32@override
     local.get $0
     i32.const 8
     i32.sub
     i32.load
     i32.const 10
     i32.eq
     if
      local.get $0
      call $~lib/as-proto/assembly/internal/FixedReader/FixedReader#varint32
      local.set $1
      br $__inlined_func$~lib/as-proto/assembly/Reader/Reader#uint32@override
     end
     unreachable
    end
    local.get $1
    i32.const 3
    i32.shr_u
    i32.const 1
    i32.eq
    if
     block $__inlined_func$~lib/as-proto/assembly/Reader/Reader#uint64@override$1
      local.get $0
      i32.const 8
      i32.sub
      i32.load
      i32.const 10
      i32.eq
      if
       local.get $0
       call $~lib/as-proto/assembly/internal/FixedReader/FixedReader#varint64
       local.set $3
       br $__inlined_func$~lib/as-proto/assembly/Reader/Reader#uint64@override$1
      end
      unreachable
     end
     local.get $4
     local.get $3
     i64.store
     br $while-continue|0
    end
    local.get $0
    local.get $1
    i32.const 7
    i32.and
    call $~lib/as-proto/assembly/Reader/Reader#skipType@override
    br $while-continue|0
   end
  end
  local.get $4
 )
 (func $~lib/@artela/aspect-libs/proto/aspect/v2/tx-verify-input/TxVerifyInput.decode (param $0 i32) (param $1 i32) (result i32)
  (local $2 i32)
  (local $3 i32)
  (local $4 i32)
  (local $5 i32)
  (local $6 i32)
  local.get $1
  i32.const 0
  i32.lt_s
  if (result i32)
   local.get $0
   i32.load offset=4
  else
   local.get $0
   i32.load
   local.get $1
   i32.add
  end
  local.set $2
  i32.const 0
  global.set $~argumentsLength
  i32.const 12
  i32.const 9
  call $~lib/rt/stub/__new
  i32.const 0
  i32.const 0
  call $~lib/arraybuffer/ArrayBufferView#constructor
  local.set $1
  i32.const 12
  i32.const 9
  call $~lib/rt/stub/__new
  i32.const 0
  i32.const 0
  call $~lib/arraybuffer/ArrayBufferView#constructor
  local.set $3
  i32.const 16
  i32.const 37
  call $~lib/rt/stub/__new
  local.tee $4
  i32.const 0
  i32.store
  local.get $4
  i32.const 0
  i32.store offset=4
  local.get $4
  i32.const 0
  i32.store offset=8
  local.get $4
  i32.const 0
  i32.store offset=12
  local.get $4
  i32.const 0
  i32.store
  local.get $4
  i32.const 0
  i32.store offset=4
  local.get $4
  local.get $1
  i32.store offset=8
  local.get $4
  local.get $3
  i32.store offset=12
  loop $while-continue|0
   local.get $0
   i32.load
   local.get $2
   i32.lt_u
   if
    block $__inlined_func$~lib/as-proto/assembly/Reader/Reader#uint32@override$2
     local.get $0
     i32.const 8
     i32.sub
     i32.load
     i32.const 10
     i32.eq
     if
      local.get $0
      call $~lib/as-proto/assembly/internal/FixedReader/FixedReader#varint32
      local.set $1
      br $__inlined_func$~lib/as-proto/assembly/Reader/Reader#uint32@override$2
     end
     unreachable
    end
    block $case4|1
     block $case3|1
      block $case2|1
       block $case1|1
        block $case0|1
         local.get $1
         i32.const 3
         i32.shr_u
         i32.const 1
         i32.sub
         br_table $case0|1 $case1|1 $case2|1 $case3|1 $case4|1
        end
        block $__inlined_func$~lib/as-proto/assembly/Reader/Reader#uint32@override$3
         local.get $0
         i32.const 8
         i32.sub
         i32.load
         i32.const 10
         i32.eq
         if
          local.get $0
          call $~lib/as-proto/assembly/internal/FixedReader/FixedReader#varint32
          local.set $1
          br $__inlined_func$~lib/as-proto/assembly/Reader/Reader#uint32@override$3
         end
         unreachable
        end
        local.get $1
        i32.const 0
        i32.lt_s
        if (result i32)
         local.get $0
         i32.load offset=4
        else
         local.get $1
         local.get $0
         i32.load
         i32.add
        end
        local.set $3
        i32.const 0
        global.set $~argumentsLength
        i32.const 12
        i32.const 9
        call $~lib/rt/stub/__new
        i32.const 0
        i32.const 0
        call $~lib/arraybuffer/ArrayBufferView#constructor
        local.set $5
        i32.const 12
        i32.const 9
        call $~lib/rt/stub/__new
        i32.const 0
        i32.const 0
        call $~lib/arraybuffer/ArrayBufferView#constructor
        local.set $6
        i32.const 8
        i32.const 38
        call $~lib/rt/stub/__new
        local.tee $1
        i32.const 0
        i32.store
        local.get $1
        i32.const 0
        i32.store offset=4
        local.get $1
        local.get $5
        i32.store
        local.get $1
        local.get $6
        i32.store offset=4
        loop $while-continue|00
         local.get $3
         local.get $0
         i32.load
         i32.gt_u
         if
          block $__inlined_func$~lib/as-proto/assembly/Reader/Reader#uint32@override$4
           local.get $0
           i32.const 8
           i32.sub
           i32.load
           i32.const 10
           i32.eq
           if
            local.get $0
            call $~lib/as-proto/assembly/internal/FixedReader/FixedReader#varint32
            local.set $5
            br $__inlined_func$~lib/as-proto/assembly/Reader/Reader#uint32@override$4
           end
           unreachable
          end
          block $case2|11
           block $case1|12
            local.get $5
            i32.const 3
            i32.shr_u
            local.tee $6
            i32.const 1
            i32.ne
            if
             local.get $6
             i32.const 2
             i32.eq
             br_if $case1|12
             br $case2|11
            end
            local.get $1
            local.get $0
            call $~lib/as-proto/assembly/Reader/Reader#bytes@override
            i32.store
            br $while-continue|00
           end
           local.get $1
           local.get $0
           call $~lib/as-proto/assembly/Reader/Reader#bytes@override
           i32.store offset=4
           br $while-continue|00
          end
          local.get $0
          local.get $5
          i32.const 7
          i32.and
          call $~lib/as-proto/assembly/Reader/Reader#skipType@override
          br $while-continue|00
         end
        end
        local.get $4
        local.get $1
        i32.store
        br $while-continue|0
       end
       block $__inlined_func$~lib/as-proto/assembly/Reader/Reader#uint32@override$5
        local.get $0
        i32.const 8
        i32.sub
        i32.load
        i32.const 10
        i32.eq
        if
         local.get $0
         call $~lib/as-proto/assembly/internal/FixedReader/FixedReader#varint32
         local.set $1
         br $__inlined_func$~lib/as-proto/assembly/Reader/Reader#uint32@override$5
        end
        unreachable
       end
       local.get $4
       local.get $0
       local.get $1
       call $~lib/@artela/aspect-libs/proto/aspect/v2/block-input/BlockInput.decode
       i32.store offset=4
       br $while-continue|0
      end
      local.get $4
      local.get $0
      call $~lib/as-proto/assembly/Reader/Reader#bytes@override
      i32.store offset=8
      br $while-continue|0
     end
     local.get $4
     local.get $0
     call $~lib/as-proto/assembly/Reader/Reader#bytes@override
     i32.store offset=12
     br $while-continue|0
    end
    local.get $0
    local.get $1
    i32.const 7
    i32.and
    call $~lib/as-proto/assembly/Reader/Reader#skipType@override
    br $while-continue|0
   end
  end
  local.get $4
 )
 (func $~lib/typedarray/Uint8Array#__get (param $0 i32) (param $1 i32) (result i32)
  local.get $1
  local.get $0
  i32.load offset=8
  i32.ge_u
  if
   i32.const 5232
   i32.const 5296
   i32.const 167
   i32.const 45
   call $~lib/builtins/abort
   unreachable
  end
  local.get $0
  i32.load offset=4
  local.get $1
  i32.add
  i32.load8_u
 )
 (func $~lib/@artela/aspect-libs/proto/aspect/v2/with-from-tx-input/WithFromTxInput.decode (param $0 i32) (param $1 i32) (result i32)
  (local $2 i32)
  (local $3 i32)
  (local $4 i32)
  (local $5 i32)
  local.get $1
  i32.const 0
  i32.lt_s
  if (result i32)
   local.get $0
   i32.load offset=4
  else
   local.get $1
   local.get $0
   i32.load
   i32.add
  end
  local.set $4
  i32.const 0
  global.set $~argumentsLength
  i32.const 12
  i32.const 9
  call $~lib/rt/stub/__new
  i32.const 0
  i32.const 0
  call $~lib/arraybuffer/ArrayBufferView#constructor
  local.set $5
  i32.const 12
  i32.const 9
  call $~lib/rt/stub/__new
  i32.const 0
  i32.const 0
  call $~lib/arraybuffer/ArrayBufferView#constructor
  local.set $2
  i32.const 12
  i32.const 9
  call $~lib/rt/stub/__new
  i32.const 0
  i32.const 0
  call $~lib/arraybuffer/ArrayBufferView#constructor
  local.set $3
  i32.const 12
  i32.const 43
  call $~lib/rt/stub/__new
  local.tee $1
  i32.const 0
  i32.store
  local.get $1
  i32.const 0
  i32.store offset=4
  local.get $1
  i32.const 0
  i32.store offset=8
  local.get $1
  local.get $5
  i32.store
  local.get $1
  local.get $2
  i32.store offset=4
  local.get $1
  local.get $3
  i32.store offset=8
  loop $while-continue|0
   local.get $4
   local.get $0
   i32.load
   i32.gt_u
   if
    block $__inlined_func$~lib/as-proto/assembly/Reader/Reader#uint32@override$6
     local.get $0
     i32.const 8
     i32.sub
     i32.load
     i32.const 10
     i32.eq
     if
      local.get $0
      call $~lib/as-proto/assembly/internal/FixedReader/FixedReader#varint32
      local.set $2
      br $__inlined_func$~lib/as-proto/assembly/Reader/Reader#uint32@override$6
     end
     unreachable
    end
    block $case3|1
     block $case2|1
      block $case1|1
       block $case0|1
        local.get $2
        i32.const 3
        i32.shr_u
        i32.const 1
        i32.sub
        br_table $case0|1 $case1|1 $case2|1 $case3|1
       end
       local.get $1
       local.get $0
       call $~lib/as-proto/assembly/Reader/Reader#bytes@override
       i32.store
       br $while-continue|0
      end
      local.get $1
      local.get $0
      call $~lib/as-proto/assembly/Reader/Reader#bytes@override
      i32.store offset=4
      br $while-continue|0
     end
     local.get $1
     local.get $0
     call $~lib/as-proto/assembly/Reader/Reader#bytes@override
     i32.store offset=8
     br $while-continue|0
    end
    local.get $0
    local.get $2
    i32.const 7
    i32.and
    call $~lib/as-proto/assembly/Reader/Reader#skipType@override
    br $while-continue|0
   end
  end
  local.get $1
 )
 (func $~lib/@artela/aspect-libs/proto/aspect/v2/pre-tx-execute-input/PreTxExecuteInput.decode (param $0 i32) (param $1 i32) (result i32)
  (local $2 i32)
  (local $3 i32)
  (local $4 i32)
  local.get $1
  i32.const 0
  i32.lt_s
  if (result i32)
   local.get $0
   i32.load offset=4
  else
   local.get $0
   i32.load
   local.get $1
   i32.add
  end
  local.set $1
  i32.const 8
  i32.const 42
  call $~lib/rt/stub/__new
  local.tee $3
  i32.const 0
  i32.store
  local.get $3
  i32.const 0
  i32.store offset=4
  local.get $3
  i32.const 0
  i32.store
  local.get $3
  i32.const 0
  i32.store offset=4
  loop $while-continue|0
   local.get $0
   i32.load
   local.get $1
   i32.lt_u
   if
    block $__inlined_func$~lib/as-proto/assembly/Reader/Reader#uint32@override$7
     local.get $0
     i32.const 8
     i32.sub
     i32.load
     i32.const 10
     i32.eq
     if
      local.get $0
      call $~lib/as-proto/assembly/internal/FixedReader/FixedReader#varint32
      local.set $4
      br $__inlined_func$~lib/as-proto/assembly/Reader/Reader#uint32@override$7
     end
     unreachable
    end
    block $case2|1
     block $case1|1
      local.get $4
      i32.const 3
      i32.shr_u
      local.tee $2
      i32.const 1
      i32.ne
      if
       local.get $2
       i32.const 2
       i32.eq
       br_if $case1|1
       br $case2|1
      end
      block $__inlined_func$~lib/as-proto/assembly/Reader/Reader#uint32@override$8
       local.get $0
       i32.const 8
       i32.sub
       i32.load
       i32.const 10
       i32.eq
       if
        local.get $0
        call $~lib/as-proto/assembly/internal/FixedReader/FixedReader#varint32
        local.set $2
        br $__inlined_func$~lib/as-proto/assembly/Reader/Reader#uint32@override$8
       end
       unreachable
      end
      local.get $3
      local.get $0
      local.get $2
      call $~lib/@artela/aspect-libs/proto/aspect/v2/with-from-tx-input/WithFromTxInput.decode
      i32.store
      br $while-continue|0
     end
     block $__inlined_func$~lib/as-proto/assembly/Reader/Reader#uint32@override$9
      local.get $0
      i32.const 8
      i32.sub
      i32.load
      i32.const 10
      i32.eq
      if
       local.get $0
       call $~lib/as-proto/assembly/internal/FixedReader/FixedReader#varint32
       local.set $2
       br $__inlined_func$~lib/as-proto/assembly/Reader/Reader#uint32@override$9
      end
      unreachable
     end
     local.get $3
     local.get $0
     local.get $2
     call $~lib/@artela/aspect-libs/proto/aspect/v2/block-input/BlockInput.decode
     i32.store offset=4
     br $while-continue|0
    end
    local.get $0
    local.get $4
    i32.const 7
    i32.and
    call $~lib/as-proto/assembly/Reader/Reader#skipType@override
    br $while-continue|0
   end
  end
  local.get $3
 )
 (func $~lib/@artela/aspect-libs/proto/aspect/v2/pre-contract-call-input/PreContractCallInput.decode (param $0 i32) (param $1 i32) (result i32)
  (local $2 i64)
  (local $3 i32)
  (local $4 i32)
  (local $5 i32)
  (local $6 i32)
  (local $7 i32)
  (local $8 i32)
  (local $9 i32)
  local.get $1
  i32.const 0
  i32.lt_s
  if (result i32)
   local.get $0
   i32.load offset=4
  else
   local.get $0
   i32.load
   local.get $1
   i32.add
  end
  local.set $3
  i32.const 8
  i32.const 46
  call $~lib/rt/stub/__new
  local.tee $1
  i32.const 0
  i32.store
  local.get $1
  i32.const 0
  i32.store offset=4
  local.get $1
  i32.const 0
  i32.store
  local.get $1
  i32.const 0
  i32.store offset=4
  loop $while-continue|0
   local.get $0
   i32.load
   local.get $3
   i32.lt_u
   if
    block $__inlined_func$~lib/as-proto/assembly/Reader/Reader#uint32@override$10
     local.get $0
     i32.const 8
     i32.sub
     i32.load
     i32.const 10
     i32.eq
     if
      local.get $0
      call $~lib/as-proto/assembly/internal/FixedReader/FixedReader#varint32
      local.set $4
      br $__inlined_func$~lib/as-proto/assembly/Reader/Reader#uint32@override$10
     end
     unreachable
    end
    block $case2|1
     block $case1|1
      local.get $4
      i32.const 3
      i32.shr_u
      local.tee $5
      i32.const 1
      i32.ne
      if
       local.get $5
       i32.const 2
       i32.eq
       br_if $case1|1
       br $case2|1
      end
      block $__inlined_func$~lib/as-proto/assembly/Reader/Reader#uint32@override$11
       local.get $0
       i32.const 8
       i32.sub
       i32.load
       i32.const 10
       i32.eq
       if
        local.get $0
        call $~lib/as-proto/assembly/internal/FixedReader/FixedReader#varint32
        local.set $4
        br $__inlined_func$~lib/as-proto/assembly/Reader/Reader#uint32@override$11
       end
       unreachable
      end
      local.get $4
      i32.const 0
      i32.lt_s
      if (result i32)
       local.get $0
       i32.load offset=4
      else
       local.get $4
       local.get $0
       i32.load
       i32.add
      end
      local.set $4
      i32.const 0
      global.set $~argumentsLength
      i32.const 12
      i32.const 9
      call $~lib/rt/stub/__new
      i32.const 0
      i32.const 0
      call $~lib/arraybuffer/ArrayBufferView#constructor
      local.set $5
      i32.const 12
      i32.const 9
      call $~lib/rt/stub/__new
      i32.const 0
      i32.const 0
      call $~lib/arraybuffer/ArrayBufferView#constructor
      local.set $6
      i32.const 12
      i32.const 9
      call $~lib/rt/stub/__new
      i32.const 0
      i32.const 0
      call $~lib/arraybuffer/ArrayBufferView#constructor
      local.set $7
      i32.const 12
      i32.const 9
      call $~lib/rt/stub/__new
      i32.const 0
      i32.const 0
      call $~lib/arraybuffer/ArrayBufferView#constructor
      local.set $8
      i32.const 32
      i32.const 47
      call $~lib/rt/stub/__new
      local.tee $9
      i32.const 0
      i32.store
      local.get $9
      i32.const 0
      i32.store offset=4
      local.get $9
      i64.const 0
      i64.store offset=8
      local.get $9
      i32.const 0
      i32.store offset=16
      local.get $9
      i32.const 0
      i32.store offset=20
      local.get $9
      i64.const 0
      i64.store offset=24
      local.get $9
      local.get $5
      i32.store
      local.get $9
      local.get $6
      i32.store offset=4
      local.get $9
      i64.const 0
      i64.store offset=8
      local.get $9
      local.get $7
      i32.store offset=16
      local.get $9
      local.get $8
      i32.store offset=20
      local.get $9
      i64.const 0
      i64.store offset=24
      loop $while-continue|00
       local.get $4
       local.get $0
       i32.load
       i32.gt_u
       if
        block $__inlined_func$~lib/as-proto/assembly/Reader/Reader#uint32@override$12
         local.get $0
         i32.const 8
         i32.sub
         i32.load
         i32.const 10
         i32.eq
         if
          local.get $0
          call $~lib/as-proto/assembly/internal/FixedReader/FixedReader#varint32
          local.set $5
          br $__inlined_func$~lib/as-proto/assembly/Reader/Reader#uint32@override$12
         end
         unreachable
        end
        block $case6|1
         block $case5|1
          block $case4|1
           block $case3|1
            block $case2|11
             block $case1|12
              block $case0|13
               local.get $5
               i32.const 3
               i32.shr_u
               i32.const 1
               i32.sub
               br_table $case0|13 $case1|12 $case2|11 $case3|1 $case4|1 $case5|1 $case6|1
              end
              local.get $9
              local.get $0
              call $~lib/as-proto/assembly/Reader/Reader#bytes@override
              i32.store
              br $while-continue|00
             end
             local.get $9
             local.get $0
             call $~lib/as-proto/assembly/Reader/Reader#bytes@override
             i32.store offset=4
             br $while-continue|00
            end
            block $__inlined_func$~lib/as-proto/assembly/Reader/Reader#uint64@override$13
             local.get $0
             i32.const 8
             i32.sub
             i32.load
             i32.const 10
             i32.eq
             if
              local.get $0
              call $~lib/as-proto/assembly/internal/FixedReader/FixedReader#varint64
              local.set $2
              br $__inlined_func$~lib/as-proto/assembly/Reader/Reader#uint64@override$13
             end
             unreachable
            end
            local.get $9
            local.get $2
            i64.store offset=8
            br $while-continue|00
           end
           local.get $9
           local.get $0
           call $~lib/as-proto/assembly/Reader/Reader#bytes@override
           i32.store offset=16
           br $while-continue|00
          end
          local.get $9
          local.get $0
          call $~lib/as-proto/assembly/Reader/Reader#bytes@override
          i32.store offset=20
          br $while-continue|00
         end
         block $__inlined_func$~lib/as-proto/assembly/Reader/Reader#uint64@override$14
          local.get $0
          i32.const 8
          i32.sub
          i32.load
          i32.const 10
          i32.eq
          if
           local.get $0
           call $~lib/as-proto/assembly/internal/FixedReader/FixedReader#varint64
           local.set $2
           br $__inlined_func$~lib/as-proto/assembly/Reader/Reader#uint64@override$14
          end
          unreachable
         end
         local.get $9
         local.get $2
         i64.store offset=24
         br $while-continue|00
        end
        local.get $0
        local.get $5
        i32.const 7
        i32.and
        call $~lib/as-proto/assembly/Reader/Reader#skipType@override
        br $while-continue|00
       end
      end
      local.get $1
      local.get $9
      i32.store
      br $while-continue|0
     end
     block $__inlined_func$~lib/as-proto/assembly/Reader/Reader#uint32@override$15
      local.get $0
      i32.const 8
      i32.sub
      i32.load
      i32.const 10
      i32.eq
      if
       local.get $0
       call $~lib/as-proto/assembly/internal/FixedReader/FixedReader#varint32
       local.set $4
       br $__inlined_func$~lib/as-proto/assembly/Reader/Reader#uint32@override$15
      end
      unreachable
     end
     local.get $1
     local.get $0
     local.get $4
     call $~lib/@artela/aspect-libs/proto/aspect/v2/block-input/BlockInput.decode
     i32.store offset=4
     br $while-continue|0
    end
    local.get $0
    local.get $4
    i32.const 7
    i32.and
    call $~lib/as-proto/assembly/Reader/Reader#skipType@override
    br $while-continue|0
   end
  end
  local.get $1
 )
 (func $~lib/@artela/aspect-libs/types/aspect-entry/EntryPoint#preContractCall (param $0 i32) (param $1 i32)
  (local $2 i64)
  (local $3 i32)
  (local $4 i32)
  (local $5 i32)
  (local $6 i64)
  (local $7 i64)
  (local $8 i32)
  (local $9 i64)
  (local $10 i32)
  local.get $0
  i32.load
  i32.eqz
  if
   i32.const 5472
   i32.const 5360
   i32.const 113
   i32.const 7
   call $~lib/builtins/abort
   unreachable
  end
  i32.const 2
  global.set $~argumentsLength
  global.get $~lib/as-proto/assembly/Protobuf/READER
  local.tee $3
  local.get $1
  i32.load offset=4
  i32.store
  local.get $3
  local.get $1
  i32.load offset=4
  local.get $1
  i32.load offset=8
  i32.add
  i32.store offset=4
  local.get $3
  local.get $1
  i32.store offset=8
  i32.const 2
  global.set $~argumentsLength
  global.get $~lib/as-proto/assembly/Protobuf/READER
  i32.const -1
  i32.const 5680
  i32.load
  call_indirect (type $0)
  local.set $1
  block $__inlined_func$~instanceof|~lib/@artela/aspect-libs/types/aspect-interface/IPreContractCallJP$180 (result i32)
   local.get $0
   i32.load
   local.tee $0
   i32.eqz
   if
    i32.const 2112
    i32.const 5360
    i32.const 117
    i32.const 29
    call $~lib/builtins/abort
    unreachable
   end
   i32.const 0
   local.get $0
   i32.const 8
   i32.sub
   i32.load
   i32.const 31
   i32.ne
   br_if $__inlined_func$~instanceof|~lib/@artela/aspect-libs/types/aspect-interface/IPreContractCallJP$180
   drop
   i32.const 1
  end
  i32.eqz
  if
   i32.const 5584
   i32.const 5360
   i32.const 117
   i32.const 29
   call $~lib/builtins/abort
   unreachable
  end
  block $__inlined_func$~lib/@artela/aspect-libs/types/aspect-interface/IPreContractCallJP#preContractCall@override$181
   local.get $0
   i32.const 8
   i32.sub
   i32.load
   i32.const 31
   i32.eq
   if
    i32.const 7888
    call $~lib/@artela/aspect-libs/components/aspect/aspect-property/AspectProperty#get<u64>
    local.set $9
    i32.const 8720
    call $~lib/@artela/aspect-libs/components/aspect/aspect-property/AspectProperty#get<u64>
    local.set $7
    local.get $1
    i32.load
    local.tee $0
    i32.eqz
    if
     i32.const 2112
     i32.const 8752
     i32.const 27
     i32.const 49
     call $~lib/builtins/abort
     unreachable
    end
    local.get $0
    i32.load offset=4
    call $~lib/@artela/aspect-libs/common/helper/convert/uint8ArrayToHex
    local.set $0
    local.get $1
    i32.load
    local.tee $1
    i32.eqz
    if
     i32.const 2112
     i32.const 8752
     i32.const 28
     i32.const 38
     call $~lib/builtins/abort
     unreachable
    end
    local.get $1
    i32.load
    call $~lib/@artela/aspect-libs/common/helper/convert/uint8ArrayToHex
    local.set $1
    i32.const 8912
    local.get $0
    i32.store
    i32.const 8920
    local.get $1
    i32.store
    i32.const 8912
    call $~lib/staticarray/StaticArray<~lib/string/String>#join
    local.set $8
    call $~lib/@artela/aspect-libs/common/wraptypes/basic-types/AString#constructor
    local.tee $10
    i32.const 8944
    i32.store offset=4
    local.get $10
    i32.load
    local.set $5
    i32.const 8944
    local.set $1
    i32.const 0
    local.set $0
    i32.const 8940
    i32.load
    i32.const 8944
    i32.add
    local.set $3
    loop $while-continue|0
     local.get $1
     local.get $3
     i32.lt_u
     if
      local.get $1
      i32.load16_u
      local.tee $4
      i32.const 128
      i32.lt_u
      if (result i32)
       local.get $0
       i32.const 1
       i32.add
      else
       local.get $4
       i32.const 2048
       i32.lt_u
       if (result i32)
        local.get $0
        i32.const 2
        i32.add
       else
        local.get $4
        i32.const 64512
        i32.and
        i32.const 55296
        i32.eq
        local.get $1
        i32.const 2
        i32.add
        local.get $3
        i32.lt_u
        i32.and
        if
         local.get $1
         i32.load16_u offset=2
         i32.const 64512
         i32.and
         i32.const 56320
         i32.eq
         if
          local.get $0
          i32.const 4
          i32.add
          local.set $0
          local.get $1
          i32.const 4
          i32.add
          local.set $1
          br $while-continue|0
         end
        end
        local.get $0
        i32.const 3
        i32.add
       end
      end
      local.set $0
      local.get $1
      i32.const 2
      i32.add
      local.set $1
      br $while-continue|0
     end
    end
    local.get $5
    local.get $0
    i32.store offset=4
    local.get $10
    call $~lib/@artela/aspect-libs/common/wraptypes/basic-types/AString#store
    call $~lib/@artela/aspect-libs/hostapi/runtime-api/__RuntimeContextApi__.get
    local.set $0
    i32.const 0
    global.set $~argumentsLength
    call $~lib/@artela/aspect-libs/common/wraptypes/basic-types/AUint8Array#constructor@varargs
    local.tee $1
    local.get $0
    call $~lib/@artela/aspect-libs/common/wraptypes/basic-types/AUint8Array#load
    local.get $1
    i32.load offset=4
    local.set $0
    i32.const 2
    global.set $~argumentsLength
    global.get $~lib/as-proto/assembly/Protobuf/READER
    local.tee $1
    local.get $0
    i32.load offset=4
    i32.store
    local.get $1
    local.get $0
    i32.load offset=4
    local.get $0
    i32.load offset=8
    i32.add
    i32.store offset=4
    local.get $1
    local.get $0
    i32.store offset=8
    i32.const 2
    global.set $~argumentsLength
    global.get $~lib/as-proto/assembly/Protobuf/READER
    i32.const -1
    i32.const 9008
    i32.load
    call_indirect (type $0)
    i64.load
    local.set $2
    local.get $8
    i32.const 9040
    call $~lib/string/String.__concat
    call $~lib/@artela/aspect-libs/components/aspect/aspect-state/MutableAspectState#get<u64>
    local.tee $0
    call $~lib/@artela/aspect-libs/components/aspect/aspect-state/ImmutableStateValue<u64>#unwrap
    local.tee $6
    i64.const 0
    i64.ne
    local.get $2
    local.get $6
    i64.sub
    local.get $9
    i64.lt_u
    i32.and
    if
     i32.const 9088
     call $~lib/@artela/aspect-libs/package/sys.revert
    end
    local.get $7
    i64.const 0
    i64.ne
    local.get $7
    local.get $8
    i32.const 9136
    call $~lib/string/String.__concat
    call $~lib/@artela/aspect-libs/components/aspect/aspect-state/MutableAspectState#get<u64>
    local.tee $1
    call $~lib/@artela/aspect-libs/components/aspect/aspect-state/ImmutableStateValue<u64>#unwrap
    local.tee $6
    i64.le_u
    i32.and
    if
     i32.const 9184
     call $~lib/@artela/aspect-libs/package/sys.revert
    end
    local.get $1
    local.get $6
    i64.const 1
    i64.add
    call $~lib/@artela/aspect-libs/components/aspect/aspect-state/MutableStateValue<u64>#set<u64>
    local.get $0
    local.get $2
    call $~lib/@artela/aspect-libs/components/aspect/aspect-state/MutableStateValue<u64>#set<u64>
    br $__inlined_func$~lib/@artela/aspect-libs/types/aspect-interface/IPreContractCallJP#preContractCall@override$181
   end
   unreachable
  end
 )
 (func $~lib/@artela/aspect-libs/proto/aspect/v2/post-exec-message-input/PostExecMessageInput.decode (param $0 i32) (param $1 i32) (result i32)
  (local $2 i64)
  (local $3 i32)
  (local $4 i32)
  (local $5 i32)
  (local $6 i32)
  (local $7 i32)
  (local $8 i32)
  local.get $1
  i32.const 0
  i32.lt_s
  if (result i32)
   local.get $0
   i32.load offset=4
  else
   local.get $1
   local.get $0
   i32.load
   i32.add
  end
  local.set $1
  i32.const 0
  global.set $~argumentsLength
  i32.const 12
  i32.const 9
  call $~lib/rt/stub/__new
  i32.const 0
  i32.const 0
  call $~lib/arraybuffer/ArrayBufferView#constructor
  local.set $3
  i32.const 12
  i32.const 9
  call $~lib/rt/stub/__new
  i32.const 0
  i32.const 0
  call $~lib/arraybuffer/ArrayBufferView#constructor
  local.set $4
  i32.const 12
  i32.const 9
  call $~lib/rt/stub/__new
  i32.const 0
  i32.const 0
  call $~lib/arraybuffer/ArrayBufferView#constructor
  local.set $5
  i32.const 12
  i32.const 9
  call $~lib/rt/stub/__new
  i32.const 0
  i32.const 0
  call $~lib/arraybuffer/ArrayBufferView#constructor
  local.set $6
  i32.const 12
  i32.const 9
  call $~lib/rt/stub/__new
  i32.const 0
  i32.const 0
  call $~lib/arraybuffer/ArrayBufferView#constructor
  local.set $7
  i32.const 40
  i32.const 50
  call $~lib/rt/stub/__new
  local.tee $8
  i32.const 0
  i32.store
  local.get $8
  i32.const 0
  i32.store offset=4
  local.get $8
  i64.const 0
  i64.store offset=8
  local.get $8
  i32.const 0
  i32.store offset=16
  local.get $8
  i32.const 0
  i32.store offset=20
  local.get $8
  i64.const 0
  i64.store offset=24
  local.get $8
  i32.const 0
  i32.store offset=32
  local.get $8
  i32.const 0
  i32.store offset=36
  local.get $8
  local.get $3
  i32.store
  local.get $8
  local.get $4
  i32.store offset=4
  local.get $8
  i64.const 0
  i64.store offset=8
  local.get $8
  local.get $5
  i32.store offset=16
  local.get $8
  local.get $6
  i32.store offset=20
  local.get $8
  i64.const 0
  i64.store offset=24
  local.get $8
  local.get $7
  i32.store offset=32
  local.get $8
  i32.const 1424
  i32.store offset=36
  loop $while-continue|0
   local.get $1
   local.get $0
   i32.load
   i32.gt_u
   if
    block $__inlined_func$~lib/as-proto/assembly/Reader/Reader#uint32@override$16
     local.get $0
     i32.const 8
     i32.sub
     i32.load
     i32.const 10
     i32.eq
     if
      local.get $0
      call $~lib/as-proto/assembly/internal/FixedReader/FixedReader#varint32
      local.set $3
      br $__inlined_func$~lib/as-proto/assembly/Reader/Reader#uint32@override$16
     end
     unreachable
    end
    block $case8|1
     block $case7|1
      block $case6|1
       block $case5|1
        block $case4|1
         block $case3|1
          block $case2|1
           block $case1|1
            block $case0|1
             local.get $3
             i32.const 3
             i32.shr_u
             i32.const 1
             i32.sub
             br_table $case0|1 $case1|1 $case2|1 $case3|1 $case4|1 $case5|1 $case6|1 $case7|1 $case8|1
            end
            local.get $8
            local.get $0
            call $~lib/as-proto/assembly/Reader/Reader#bytes@override
            i32.store
            br $while-continue|0
           end
           local.get $8
           local.get $0
           call $~lib/as-proto/assembly/Reader/Reader#bytes@override
           i32.store offset=4
           br $while-continue|0
          end
          block $__inlined_func$~lib/as-proto/assembly/Reader/Reader#uint64@override$17
           local.get $0
           i32.const 8
           i32.sub
           i32.load
           i32.const 10
           i32.eq
           if
            local.get $0
            call $~lib/as-proto/assembly/internal/FixedReader/FixedReader#varint64
            local.set $2
            br $__inlined_func$~lib/as-proto/assembly/Reader/Reader#uint64@override$17
           end
           unreachable
          end
          local.get $8
          local.get $2
          i64.store offset=8
          br $while-continue|0
         end
         local.get $8
         local.get $0
         call $~lib/as-proto/assembly/Reader/Reader#bytes@override
         i32.store offset=16
         br $while-continue|0
        end
        local.get $8
        local.get $0
        call $~lib/as-proto/assembly/Reader/Reader#bytes@override
        i32.store offset=20
        br $while-continue|0
       end
       block $__inlined_func$~lib/as-proto/assembly/Reader/Reader#uint64@override$18
        local.get $0
        i32.const 8
        i32.sub
        i32.load
        i32.const 10
        i32.eq
        if
         local.get $0
         call $~lib/as-proto/assembly/internal/FixedReader/FixedReader#varint64
         local.set $2
         br $__inlined_func$~lib/as-proto/assembly/Reader/Reader#uint64@override$18
        end
        unreachable
       end
       local.get $8
       local.get $2
       i64.store offset=24
       br $while-continue|0
      end
      local.get $8
      local.get $0
      call $~lib/as-proto/assembly/Reader/Reader#bytes@override
      i32.store offset=32
      br $while-continue|0
     end
     block $__inlined_func$~lib/as-proto/assembly/Reader/Reader#string@override$194
      local.get $0
      i32.const 8
      i32.sub
      i32.load
      i32.const 10
      i32.eq
      if
       local.get $0
       local.get $0
       call $~lib/as-proto/assembly/internal/FixedReader/FixedReader#varint32
       local.tee $3
       local.get $0
       i32.load
       local.tee $4
       i32.add
       i32.store
       local.get $0
       i32.load
       local.get $0
       i32.load offset=4
       i32.gt_u
       if
        i32.const 5232
        i32.const 5936
        i32.const 210
        i32.const 5
        call $~lib/builtins/abort
        unreachable
       end
       local.get $4
       local.get $3
       call $~lib/string/String.UTF8.decodeUnsafe
       local.set $3
       br $__inlined_func$~lib/as-proto/assembly/Reader/Reader#string@override$194
      end
      unreachable
     end
     local.get $8
     local.get $3
     i32.store offset=36
     br $while-continue|0
    end
    local.get $0
    local.get $3
    i32.const 7
    i32.and
    call $~lib/as-proto/assembly/Reader/Reader#skipType@override
    br $while-continue|0
   end
  end
  local.get $8
 )
 (func $~lib/@artela/aspect-libs/proto/aspect/v2/post-contract-call-input/PostContractCallInput.decode (param $0 i32) (param $1 i32) (result i32)
  (local $2 i32)
  (local $3 i32)
  (local $4 i32)
  local.get $1
  i32.const 0
  i32.lt_s
  if (result i32)
   local.get $0
   i32.load offset=4
  else
   local.get $0
   i32.load
   local.get $1
   i32.add
  end
  local.set $1
  i32.const 8
  i32.const 49
  call $~lib/rt/stub/__new
  local.tee $3
  i32.const 0
  i32.store
  local.get $3
  i32.const 0
  i32.store offset=4
  local.get $3
  i32.const 0
  i32.store
  local.get $3
  i32.const 0
  i32.store offset=4
  loop $while-continue|0
   local.get $0
   i32.load
   local.get $1
   i32.lt_u
   if
    block $__inlined_func$~lib/as-proto/assembly/Reader/Reader#uint32@override$19
     local.get $0
     i32.const 8
     i32.sub
     i32.load
     i32.const 10
     i32.eq
     if
      local.get $0
      call $~lib/as-proto/assembly/internal/FixedReader/FixedReader#varint32
      local.set $4
      br $__inlined_func$~lib/as-proto/assembly/Reader/Reader#uint32@override$19
     end
     unreachable
    end
    block $case2|1
     block $case1|1
      local.get $4
      i32.const 3
      i32.shr_u
      local.tee $2
      i32.const 1
      i32.ne
      if
       local.get $2
       i32.const 2
       i32.eq
       br_if $case1|1
       br $case2|1
      end
      block $__inlined_func$~lib/as-proto/assembly/Reader/Reader#uint32@override$20
       local.get $0
       i32.const 8
       i32.sub
       i32.load
       i32.const 10
       i32.eq
       if
        local.get $0
        call $~lib/as-proto/assembly/internal/FixedReader/FixedReader#varint32
        local.set $2
        br $__inlined_func$~lib/as-proto/assembly/Reader/Reader#uint32@override$20
       end
       unreachable
      end
      local.get $3
      local.get $0
      local.get $2
      call $~lib/@artela/aspect-libs/proto/aspect/v2/post-exec-message-input/PostExecMessageInput.decode
      i32.store
      br $while-continue|0
     end
     block $__inlined_func$~lib/as-proto/assembly/Reader/Reader#uint32@override$21
      local.get $0
      i32.const 8
      i32.sub
      i32.load
      i32.const 10
      i32.eq
      if
       local.get $0
       call $~lib/as-proto/assembly/internal/FixedReader/FixedReader#varint32
       local.set $2
       br $__inlined_func$~lib/as-proto/assembly/Reader/Reader#uint32@override$21
      end
      unreachable
     end
     local.get $3
     local.get $0
     local.get $2
     call $~lib/@artela/aspect-libs/proto/aspect/v2/block-input/BlockInput.decode
     i32.store offset=4
     br $while-continue|0
    end
    local.get $0
    local.get $4
    i32.const 7
    i32.and
    call $~lib/as-proto/assembly/Reader/Reader#skipType@override
    br $while-continue|0
   end
  end
  local.get $3
 )
 (func $~lib/@artela/aspect-libs/proto/aspect/v2/post-tx-execute-input/PostTxExecuteInput.decode (param $0 i32) (param $1 i32) (result i32)
  (local $2 i32)
  (local $3 i32)
  (local $4 i64)
  (local $5 i32)
  (local $6 i32)
  local.get $1
  i32.const 0
  i32.lt_s
  if (result i32)
   local.get $0
   i32.load offset=4
  else
   local.get $0
   i32.load
   local.get $1
   i32.add
  end
  local.set $2
  i32.const 12
  i32.const 53
  call $~lib/rt/stub/__new
  local.tee $5
  i32.const 0
  i32.store
  local.get $5
  i32.const 0
  i32.store offset=4
  local.get $5
  i32.const 0
  i32.store offset=8
  local.get $5
  i32.const 0
  i32.store
  local.get $5
  i32.const 0
  i32.store offset=4
  local.get $5
  i32.const 0
  i32.store offset=8
  loop $while-continue|0
   local.get $0
   i32.load
   local.get $2
   i32.lt_u
   if
    block $__inlined_func$~lib/as-proto/assembly/Reader/Reader#uint32@override$22
     local.get $0
     i32.const 8
     i32.sub
     i32.load
     i32.const 10
     i32.eq
     if
      local.get $0
      call $~lib/as-proto/assembly/internal/FixedReader/FixedReader#varint32
      local.set $1
      br $__inlined_func$~lib/as-proto/assembly/Reader/Reader#uint32@override$22
     end
     unreachable
    end
    block $case3|1
     block $case2|1
      block $case1|1
       block $case0|1
        local.get $1
        i32.const 3
        i32.shr_u
        i32.const 1
        i32.sub
        br_table $case0|1 $case1|1 $case2|1 $case3|1
       end
       block $__inlined_func$~lib/as-proto/assembly/Reader/Reader#uint32@override$23
        local.get $0
        i32.const 8
        i32.sub
        i32.load
        i32.const 10
        i32.eq
        if
         local.get $0
         call $~lib/as-proto/assembly/internal/FixedReader/FixedReader#varint32
         local.set $1
         br $__inlined_func$~lib/as-proto/assembly/Reader/Reader#uint32@override$23
        end
        unreachable
       end
       local.get $5
       local.get $0
       local.get $1
       call $~lib/@artela/aspect-libs/proto/aspect/v2/with-from-tx-input/WithFromTxInput.decode
       i32.store
       br $while-continue|0
      end
      block $__inlined_func$~lib/as-proto/assembly/Reader/Reader#uint32@override$24
       local.get $0
       i32.const 8
       i32.sub
       i32.load
       i32.const 10
       i32.eq
       if
        local.get $0
        call $~lib/as-proto/assembly/internal/FixedReader/FixedReader#varint32
        local.set $1
        br $__inlined_func$~lib/as-proto/assembly/Reader/Reader#uint32@override$24
       end
       unreachable
      end
      local.get $5
      local.get $0
      local.get $1
      call $~lib/@artela/aspect-libs/proto/aspect/v2/block-input/BlockInput.decode
      i32.store offset=4
      br $while-continue|0
     end
     block $__inlined_func$~lib/as-proto/assembly/Reader/Reader#uint32@override$25
      local.get $0
      i32.const 8
      i32.sub
      i32.load
      i32.const 10
      i32.eq
      if
       local.get $0
       call $~lib/as-proto/assembly/internal/FixedReader/FixedReader#varint32
       local.set $1
       br $__inlined_func$~lib/as-proto/assembly/Reader/Reader#uint32@override$25
      end
      unreachable
     end
     local.get $1
     i32.const 0
     i32.lt_s
     if (result i32)
      local.get $0
      i32.load offset=4
     else
      local.get $0
      i32.load
      local.get $1
      i32.add
     end
     local.set $3
     i32.const 8
     i32.const 54
     call $~lib/rt/stub/__new
     local.tee $1
     i64.const 0
     i64.store
     local.get $1
     i64.const 0
     i64.store
     loop $while-continue|01
      local.get $0
      i32.load
      local.get $3
      i32.lt_u
      if
       block $__inlined_func$~lib/as-proto/assembly/Reader/Reader#uint32@override$26
        local.get $0
        i32.const 8
        i32.sub
        i32.load
        i32.const 10
        i32.eq
        if
         local.get $0
         call $~lib/as-proto/assembly/internal/FixedReader/FixedReader#varint32
         local.set $6
         br $__inlined_func$~lib/as-proto/assembly/Reader/Reader#uint32@override$26
        end
        unreachable
       end
       local.get $6
       i32.const 3
       i32.shr_u
       i32.const 1
       i32.eq
       if
        block $__inlined_func$~lib/as-proto/assembly/Reader/Reader#uint64@override$27
         local.get $0
         i32.const 8
         i32.sub
         i32.load
         i32.const 10
         i32.eq
         if
          local.get $0
          call $~lib/as-proto/assembly/internal/FixedReader/FixedReader#varint64
          local.set $4
          br $__inlined_func$~lib/as-proto/assembly/Reader/Reader#uint64@override$27
         end
         unreachable
        end
        local.get $1
        local.get $4
        i64.store
        br $while-continue|01
       end
       local.get $0
       local.get $6
       i32.const 7
       i32.and
       call $~lib/as-proto/assembly/Reader/Reader#skipType@override
       br $while-continue|01
      end
     end
     local.get $5
     local.get $1
     i32.store offset=8
     br $while-continue|0
    end
    local.get $0
    local.get $1
    i32.const 7
    i32.and
    call $~lib/as-proto/assembly/Reader/Reader#skipType@override
    br $while-continue|0
   end
  end
  local.get $5
 )
 (func $~lib/@artela/aspect-libs/proto/aspect/v2/operation-input/OperationInput.decode (param $0 i32) (param $1 i32) (result i32)
  (local $2 i32)
  (local $3 i32)
  local.get $1
  i32.const 0
  i32.lt_s
  if (result i32)
   local.get $0
   i32.load offset=4
  else
   local.get $1
   local.get $0
   i32.load
   i32.add
  end
  local.set $1
  i32.const 0
  global.set $~argumentsLength
  i32.const 12
  i32.const 9
  call $~lib/rt/stub/__new
  i32.const 0
  i32.const 0
  call $~lib/arraybuffer/ArrayBufferView#constructor
  local.set $2
  i32.const 12
  i32.const 57
  call $~lib/rt/stub/__new
  local.tee $3
  i32.const 0
  i32.store
  local.get $3
  i32.const 0
  i32.store offset=4
  local.get $3
  i32.const 0
  i32.store offset=8
  local.get $3
  i32.const 0
  i32.store
  local.get $3
  i32.const 0
  i32.store offset=4
  local.get $3
  local.get $2
  i32.store offset=8
  loop $while-continue|0
   local.get $1
   local.get $0
   i32.load
   i32.gt_u
   if
    block $__inlined_func$~lib/as-proto/assembly/Reader/Reader#uint32@override$28
     local.get $0
     i32.const 8
     i32.sub
     i32.load
     i32.const 10
     i32.eq
     if
      local.get $0
      call $~lib/as-proto/assembly/internal/FixedReader/FixedReader#varint32
      local.set $2
      br $__inlined_func$~lib/as-proto/assembly/Reader/Reader#uint32@override$28
     end
     unreachable
    end
    block $case3|1
     block $case2|1
      block $case1|1
       block $case0|1
        local.get $2
        i32.const 3
        i32.shr_u
        i32.const 1
        i32.sub
        br_table $case0|1 $case1|1 $case2|1 $case3|1
       end
       block $__inlined_func$~lib/as-proto/assembly/Reader/Reader#uint32@override$29
        local.get $0
        i32.const 8
        i32.sub
        i32.load
        i32.const 10
        i32.eq
        if
         local.get $0
         call $~lib/as-proto/assembly/internal/FixedReader/FixedReader#varint32
         local.set $2
         br $__inlined_func$~lib/as-proto/assembly/Reader/Reader#uint32@override$29
        end
        unreachable
       end
       local.get $3
       local.get $0
       local.get $2
       call $~lib/@artela/aspect-libs/proto/aspect/v2/with-from-tx-input/WithFromTxInput.decode
       i32.store
       br $while-continue|0
      end
      block $__inlined_func$~lib/as-proto/assembly/Reader/Reader#uint32@override$30
       local.get $0
       i32.const 8
       i32.sub
       i32.load
       i32.const 10
       i32.eq
       if
        local.get $0
        call $~lib/as-proto/assembly/internal/FixedReader/FixedReader#varint32
        local.set $2
        br $__inlined_func$~lib/as-proto/assembly/Reader/Reader#uint32@override$30
       end
       unreachable
      end
      local.get $3
      local.get $0
      local.get $2
      call $~lib/@artela/aspect-libs/proto/aspect/v2/block-input/BlockInput.decode
      i32.store offset=4
      br $while-continue|0
     end
     local.get $3
     local.get $0
     call $~lib/as-proto/assembly/Reader/Reader#bytes@override
     i32.store offset=8
     br $while-continue|0
    end
    local.get $0
    local.get $2
    i32.const 7
    i32.and
    call $~lib/as-proto/assembly/Reader/Reader#skipType@override
    br $while-continue|0
   end
  end
  local.get $3
 )
 (func $~lib/string/String.__concat (param $0 i32) (param $1 i32) (result i32)
  (local $2 i32)
  (local $3 i32)
  (local $4 i32)
  (local $5 i32)
  i32.const 1424
  local.set $2
  local.get $0
  i32.const 20
  i32.sub
  i32.load offset=16
  i32.const -2
  i32.and
  local.tee $3
  local.get $1
  i32.const 20
  i32.sub
  i32.load offset=16
  i32.const -2
  i32.and
  local.tee $4
  i32.add
  local.tee $5
  if
   local.get $5
   i32.const 2
   call $~lib/rt/stub/__new
   local.tee $2
   local.get $0
   local.get $3
   call $~lib/memory/memory.copy
   local.get $2
   local.get $3
   i32.add
   local.get $1
   local.get $4
   call $~lib/memory/memory.copy
  end
  local.get $2
 )
 (func $~lib/@artela/aspect-libs/types/entrance/execute (param $0 i32) (param $1 i32) (result i32)
  (local $2 i32)
  (local $3 i32)
  (local $4 i32)
  global.get $~lib/@artela/aspect-libs/types/entrance/entryPoint
  local.set $2
  call $~lib/@artela/aspect-libs/common/wraptypes/basic-types/AString#constructor
  local.tee $3
  i32.const 0
  i32.const 0
  call $~lib/@artela/aspect-libs/common/wraptypes/basic-types/header#constructor
  i32.store
  local.get $3
  i32.load
  local.tee $4
  local.get $0
  i32.load16_s
  i32.store16
  local.get $4
  local.get $0
  i32.load offset=2
  i32.store offset=4
  local.get $3
  i32.load
  drop
  local.get $3
  local.get $0
  i32.const 6
  i32.add
  local.get $3
  i32.load
  i32.load offset=4
  call $~lib/string/String.UTF8.decodeUnsafe
  i32.store offset=4
  block $__inlined_func$~lib/@artela/aspect-libs/types/aspect-entry/EntryPoint#execute$225
   local.get $3
   i32.load offset=4
   local.tee $0
   i32.const 4544
   call $~lib/string/String.__eq
   if
    block $__inlined_func$~lib/@artela/aspect-libs/types/aspect-entry/EntryPoint#isOwner$28 (result i32)
     local.get $2
     i32.load
     if
      i32.const 0
      global.set $~argumentsLength
      call $~lib/@artela/aspect-libs/common/wraptypes/basic-types/AUint8Array#constructor@varargs
      local.tee $0
      local.get $1
      call $~lib/@artela/aspect-libs/common/wraptypes/basic-types/AUint8Array#load
      local.get $0
      i32.load offset=4
      drop
      local.get $2
      i32.load
      local.tee $0
      i32.eqz
      if
       i32.const 2112
       i32.const 5360
       i32.const 85
       i32.const 19
       call $~lib/builtins/abort
       unreachable
      end
      local.get $0
      i32.const 8
      i32.sub
      i32.load
      i32.const 31
      i32.ne
      if
       unreachable
      end
      i32.const 5
      i32.const 36
      call $~lib/rt/stub/__new
      local.tee $0
      i32.const 0
      i32.store
      local.get $0
      i32.const 0
      i32.store8 offset=4
      local.get $0
      i32.const 0
      i32.store8 offset=4
      local.get $0
      i32.const 9
      i32.const 1
      call $~lib/@artela/aspect-libs/common/wraptypes/basic-types/header#constructor
      i32.store
      local.get $0
      i32.const 0
      i32.store8 offset=4
      local.get $0
      i32.load
      i32.const 1
      i32.store offset=4
      local.get $0
      i32.load
      drop
      local.get $0
      i32.load
      i32.load offset=4
      i32.const 6
      i32.add
      call $~lib/rt/stub/__alloc
      local.tee $1
      local.get $0
      i32.load
      local.tee $2
      i32.load16_s
      i32.extend16_s
      i32.store16
      local.get $1
      local.get $2
      i32.load offset=4
      i32.store offset=2
      local.get $0
      i32.load
      drop
      local.get $1
      i32.const 6
      i32.add
      local.get $0
      i32.load8_u offset=4
      i32.const 0
      i32.ne
      i32.const 1
      call $~lib/memory/memory.fill
      local.get $1
      br $__inlined_func$~lib/@artela/aspect-libs/types/aspect-entry/EntryPoint#isOwner$28
     end
     i32.const 0
    end
    local.set $0
    br $__inlined_func$~lib/@artela/aspect-libs/types/aspect-entry/EntryPoint#execute$225
   end
   i32.const 0
   global.set $~argumentsLength
   call $~lib/@artela/aspect-libs/common/wraptypes/basic-types/AUint8Array#constructor@varargs
   local.tee $3
   local.get $1
   call $~lib/@artela/aspect-libs/common/wraptypes/basic-types/AUint8Array#load
   local.get $0
   i32.const 4112
   call $~lib/string/String.__eq
   if
    local.get $3
    i32.load offset=4
    local.set $0
    local.get $2
    i32.load
    i32.eqz
    if
     i32.const 5472
     i32.const 5360
     i32.const 93
     i32.const 7
     call $~lib/builtins/abort
     unreachable
    end
    i32.const 2
    global.set $~argumentsLength
    global.get $~lib/as-proto/assembly/Protobuf/READER
    local.tee $1
    local.get $0
    i32.load offset=4
    i32.store
    local.get $1
    local.get $0
    i32.load offset=4
    local.get $0
    i32.load offset=8
    i32.add
    i32.store offset=4
    local.get $1
    local.get $0
    i32.store offset=8
    i32.const 2
    global.set $~argumentsLength
    global.get $~lib/as-proto/assembly/Protobuf/READER
    i32.const -1
    i32.const 5552
    i32.load
    call_indirect (type $0)
    drop
    local.get $2
    i32.load
    local.tee $0
    i32.eqz
    if
     i32.const 2112
     i32.const 5360
     i32.const 97
     i32.const 33
     call $~lib/builtins/abort
     unreachable
    end
    local.get $0
    i32.const 8
    i32.sub
    i32.load
    drop
    i32.const 5584
    i32.const 5360
    i32.const 97
    i32.const 33
    call $~lib/builtins/abort
    unreachable
   end
   local.get $0
   i32.const 4160
   call $~lib/string/String.__eq
   if
    local.get $3
    i32.load offset=4
    local.set $0
    local.get $2
    i32.load
    i32.eqz
    if
     i32.const 5472
     i32.const 5360
     i32.const 103
     i32.const 7
     call $~lib/builtins/abort
     unreachable
    end
    i32.const 2
    global.set $~argumentsLength
    global.get $~lib/as-proto/assembly/Protobuf/READER
    local.tee $1
    local.get $0
    i32.load offset=4
    i32.store
    local.get $1
    local.get $0
    i32.load offset=4
    local.get $0
    i32.load offset=8
    i32.add
    i32.store offset=4
    local.get $1
    local.get $0
    i32.store offset=8
    i32.const 2
    global.set $~argumentsLength
    global.get $~lib/as-proto/assembly/Protobuf/READER
    i32.const -1
    i32.const 5648
    i32.load
    call_indirect (type $0)
    drop
    local.get $2
    i32.load
    local.tee $0
    i32.eqz
    if
     i32.const 2112
     i32.const 5360
     i32.const 107
     i32.const 26
     call $~lib/builtins/abort
     unreachable
    end
    local.get $0
    i32.const 8
    i32.sub
    i32.load
    drop
    i32.const 5584
    i32.const 5360
    i32.const 107
    i32.const 26
    call $~lib/builtins/abort
    unreachable
   end
   local.get $0
   i32.const 4208
   call $~lib/string/String.__eq
   if
    local.get $2
    local.get $3
    i32.load offset=4
    call $~lib/@artela/aspect-libs/types/aspect-entry/EntryPoint#preContractCall
    i32.const 0
    local.set $0
    br $__inlined_func$~lib/@artela/aspect-libs/types/aspect-entry/EntryPoint#execute$225
   end
   local.get $0
   i32.const 4272
   call $~lib/string/String.__eq
   if
    local.get $3
    i32.load offset=4
    local.set $0
    local.get $2
    i32.load
    i32.eqz
    if
     i32.const 5472
     i32.const 5360
     i32.const 123
     i32.const 7
     call $~lib/builtins/abort
     unreachable
    end
    i32.const 2
    global.set $~argumentsLength
    global.get $~lib/as-proto/assembly/Protobuf/READER
    local.tee $1
    local.get $0
    i32.load offset=4
    i32.store
    local.get $1
    local.get $0
    i32.load offset=4
    local.get $0
    i32.load offset=8
    i32.add
    i32.store offset=4
    local.get $1
    local.get $0
    i32.store offset=8
    i32.const 2
    global.set $~argumentsLength
    global.get $~lib/as-proto/assembly/Protobuf/READER
    i32.const -1
    i32.const 5712
    i32.load
    call_indirect (type $0)
    drop
    local.get $2
    i32.load
    local.tee $0
    i32.eqz
    if
     i32.const 2112
     i32.const 5360
     i32.const 127
     i32.const 30
     call $~lib/builtins/abort
     unreachable
    end
    local.get $0
    i32.const 8
    i32.sub
    i32.load
    drop
    i32.const 5584
    i32.const 5360
    i32.const 127
    i32.const 30
    call $~lib/builtins/abort
    unreachable
   end
   local.get $0
   i32.const 4336
   call $~lib/string/String.__eq
   if
    local.get $3
    i32.load offset=4
    local.set $0
    local.get $2
    i32.load
    i32.eqz
    if
     i32.const 5472
     i32.const 5360
     i32.const 133
     i32.const 7
     call $~lib/builtins/abort
     unreachable
    end
    i32.const 2
    global.set $~argumentsLength
    global.get $~lib/as-proto/assembly/Protobuf/READER
    local.tee $1
    local.get $0
    i32.load offset=4
    i32.store
    local.get $1
    local.get $0
    i32.load offset=4
    local.get $0
    i32.load offset=8
    i32.add
    i32.store offset=4
    local.get $1
    local.get $0
    i32.store offset=8
    i32.const 2
    global.set $~argumentsLength
    global.get $~lib/as-proto/assembly/Protobuf/READER
    i32.const -1
    i32.const 5744
    i32.load
    call_indirect (type $0)
    drop
    local.get $2
    i32.load
    local.tee $0
    i32.eqz
    if
     i32.const 2112
     i32.const 5360
     i32.const 137
     i32.const 27
     call $~lib/builtins/abort
     unreachable
    end
    local.get $0
    i32.const 8
    i32.sub
    i32.load
    drop
    i32.const 5584
    i32.const 5360
    i32.const 137
    i32.const 27
    call $~lib/builtins/abort
    unreachable
   end
   local.get $0
   i32.const 4496
   call $~lib/string/String.__eq
   if
    local.get $3
    i32.load offset=4
    local.set $0
    local.get $2
    i32.load offset=4
    i32.eqz
    if
     i32.const 5472
     i32.const 5360
     i32.const 143
     i32.const 7
     call $~lib/builtins/abort
     unreachable
    end
    i32.const 2
    global.set $~argumentsLength
    global.get $~lib/as-proto/assembly/Protobuf/READER
    local.tee $1
    local.get $0
    i32.load offset=4
    i32.store
    local.get $1
    local.get $0
    i32.load offset=4
    local.get $0
    i32.load offset=8
    i32.add
    i32.store offset=4
    local.get $1
    local.get $0
    i32.store offset=8
    i32.const 2
    global.set $~argumentsLength
    global.get $~lib/as-proto/assembly/Protobuf/READER
    i32.const -1
    i32.const 5776
    i32.load
    call_indirect (type $0)
    drop
    local.get $2
    i32.load offset=4
    local.tee $0
    i32.eqz
    if
     i32.const 2112
     i32.const 5360
     i32.const 147
     i32.const 23
     call $~lib/builtins/abort
     unreachable
    end
    local.get $0
    i32.const 8
    i32.sub
    i32.load
    drop
    unreachable
   end
   i32.const 5808
   local.get $0
   call $~lib/string/String.__concat
   i32.const 5856
   call $~lib/string/String.__concat
   i32.const 5360
   i32.const 79
   i32.const 5
   call $~lib/builtins/abort
   unreachable
  end
  local.get $0
 )
 (func $~lib/@artela/aspect-libs/types/entrance/allocate (param $0 i32) (result i32)
  local.get $0
  call $~lib/rt/stub/__alloc
 )
 (func $~lib/rt/stub/__pin (param $0 i32) (result i32)
  local.get $0
 )
 (func $~lib/rt/stub/__unpin (param $0 i32)
 )
 (func $~lib/rt/stub/__collect
 )
 (func $~lib/as-proto/assembly/internal/FixedReader/FixedReader#varint32 (param $0 i32) (result i32)
  (local $1 i32)
  (local $2 i32)
  local.get $0
  local.get $0
  i32.load
  local.tee $1
  i32.const 1
  i32.add
  i32.store
  block $folding-inner1
   block $folding-inner0
    local.get $0
    i32.load
    local.get $0
    i32.load offset=4
    i32.gt_u
    br_if $folding-inner0
    local.get $1
    i32.load8_u
    local.tee $2
    i32.const 127
    i32.and
    local.set $1
    local.get $2
    i32.const 128
    i32.lt_u
    br_if $folding-inner1
    local.get $0
    i32.load
    local.set $2
    local.get $0
    local.get $0
    i32.load
    i32.const 1
    i32.add
    i32.store
    local.get $0
    i32.load
    local.get $0
    i32.load offset=4
    i32.gt_u
    br_if $folding-inner0
    local.get $1
    local.get $2
    i32.load8_u
    local.tee $2
    i32.const 127
    i32.and
    i32.const 7
    i32.shl
    i32.or
    local.set $1
    local.get $2
    i32.const 128
    i32.lt_u
    br_if $folding-inner1
    local.get $0
    i32.load
    local.set $2
    local.get $0
    local.get $0
    i32.load
    i32.const 1
    i32.add
    i32.store
    local.get $0
    i32.load
    local.get $0
    i32.load offset=4
    i32.gt_u
    br_if $folding-inner0
    local.get $1
    local.get $2
    i32.load8_u
    local.tee $2
    i32.const 127
    i32.and
    i32.const 14
    i32.shl
    i32.or
    local.set $1
    local.get $2
    i32.const 128
    i32.lt_u
    br_if $folding-inner1
    local.get $0
    i32.load
    local.set $2
    local.get $0
    local.get $0
    i32.load
    i32.const 1
    i32.add
    i32.store
    local.get $0
    i32.load
    local.get $0
    i32.load offset=4
    i32.gt_u
    br_if $folding-inner0
    local.get $1
    local.get $2
    i32.load8_u
    local.tee $2
    i32.const 127
    i32.and
    i32.const 21
    i32.shl
    i32.or
    local.set $1
    local.get $2
    i32.const 128
    i32.lt_u
    br_if $folding-inner1
    local.get $0
    i32.load
    local.set $2
    local.get $0
    local.get $0
    i32.load
    i32.const 1
    i32.add
    i32.store
    local.get $0
    i32.load
    local.get $0
    i32.load offset=4
    i32.gt_u
    br_if $folding-inner0
    local.get $1
    local.get $2
    i32.load8_u
    local.tee $2
    i32.const 15
    i32.and
    i32.const 28
    i32.shl
    i32.or
    local.set $1
    local.get $2
    i32.const 128
    i32.lt_u
    br_if $folding-inner1
    local.get $0
    i32.load
    local.set $2
    local.get $0
    local.get $0
    i32.load
    i32.const 1
    i32.add
    i32.store
    local.get $0
    i32.load
    local.get $0
    i32.load offset=4
    i32.gt_u
    br_if $folding-inner0
    local.get $2
    i32.load8_u
    i32.const 128
    i32.lt_u
    br_if $folding-inner1
    local.get $0
    i32.load
    local.set $2
    local.get $0
    local.get $0
    i32.load
    i32.const 1
    i32.add
    i32.store
    local.get $0
    i32.load
    local.get $0
    i32.load offset=4
    i32.gt_u
    br_if $folding-inner0
    local.get $2
    i32.load8_u
    i32.const 128
    i32.lt_u
    br_if $folding-inner1
    local.get $0
    i32.load
    local.set $2
    local.get $0
    local.get $0
    i32.load
    i32.const 1
    i32.add
    i32.store
    local.get $0
    i32.load
    local.get $0
    i32.load offset=4
    i32.gt_u
    br_if $folding-inner0
    local.get $2
    i32.load8_u
    i32.const 128
    i32.lt_u
    br_if $folding-inner1
    local.get $0
    i32.load
    local.set $2
    local.get $0
    local.get $0
    i32.load
    i32.const 1
    i32.add
    i32.store
    local.get $0
    i32.load
    local.get $0
    i32.load offset=4
    i32.gt_u
    br_if $folding-inner0
    local.get $2
    i32.load8_u
    i32.const 128
    i32.lt_u
    br_if $folding-inner1
    local.get $0
    i32.load
    local.set $2
    local.get $0
    local.get $0
    i32.load
    i32.const 1
    i32.add
    i32.store
    local.get $0
    i32.load
    local.get $0
    i32.load offset=4
    i32.gt_u
    br_if $folding-inner0
    local.get $2
    i32.load8_u
    drop
    br $folding-inner1
   end
   i32.const 5232
   i32.const 5936
   i32.const 210
   i32.const 5
   call $~lib/builtins/abort
   unreachable
  end
  local.get $1
 )
 (func $~lib/as-proto/assembly/internal/FixedReader/FixedReader#skip (param $0 i32) (param $1 i32)
  block $folding-inner0
   local.get $1
   if
    local.get $0
    local.get $0
    i32.load
    local.get $1
    i32.add
    i32.store
    local.get $0
    i32.load
    local.get $0
    i32.load offset=4
    i32.gt_u
    br_if $folding-inner0
   else
    loop $while-continue|0
     local.get $0
     local.get $0
     i32.load
     local.tee $1
     i32.const 1
     i32.add
     i32.store
     local.get $0
     i32.load
     local.get $0
     i32.load offset=4
     i32.gt_u
     br_if $folding-inner0
     local.get $1
     i32.load8_u
     i32.const 128
     i32.and
     br_if $while-continue|0
    end
   end
   return
  end
  i32.const 5232
  i32.const 5936
  i32.const 210
  i32.const 5
  call $~lib/builtins/abort
  unreachable
 )
 (func $~lib/util/number/itoa32 (param $0 i32) (result i32)
  (local $1 i32)
  (local $2 i32)
  (local $3 i32)
  (local $4 i32)
  (local $5 i32)
  local.get $0
  i32.eqz
  if
   i32.const 6304
   return
  end
  i32.const 0
  local.get $0
  i32.sub
  local.get $0
  local.get $0
  i32.const 31
  i32.shr_u
  i32.const 1
  i32.shl
  local.tee $4
  select
  local.tee $1
  i32.const 100000
  i32.lt_u
  if (result i32)
   local.get $1
   i32.const 100
   i32.lt_u
   if (result i32)
    local.get $1
    i32.const 10
    i32.ge_u
    i32.const 1
    i32.add
   else
    local.get $1
    i32.const 10000
    i32.ge_u
    i32.const 3
    i32.add
    local.get $1
    i32.const 1000
    i32.ge_u
    i32.add
   end
  else
   local.get $1
   i32.const 10000000
   i32.lt_u
   if (result i32)
    local.get $1
    i32.const 1000000
    i32.ge_u
    i32.const 6
    i32.add
   else
    local.get $1
    i32.const 1000000000
    i32.ge_u
    i32.const 8
    i32.add
    local.get $1
    i32.const 100000000
    i32.ge_u
    i32.add
   end
  end
  local.tee $0
  i32.const 1
  i32.shl
  local.get $4
  i32.add
  i32.const 2
  call $~lib/rt/stub/__new
  local.tee $3
  local.get $4
  i32.add
  local.set $5
  loop $while-continue|0
   local.get $1
   i32.const 10000
   i32.ge_u
   if
    local.get $1
    i32.const 10000
    i32.rem_u
    local.set $2
    local.get $1
    i32.const 10000
    i32.div_u
    local.set $1
    local.get $5
    local.get $0
    i32.const 4
    i32.sub
    local.tee $0
    i32.const 1
    i32.shl
    i32.add
    local.get $2
    i32.const 100
    i32.div_u
    i32.const 2
    i32.shl
    i32.const 6316
    i32.add
    i64.load32_u
    local.get $2
    i32.const 100
    i32.rem_u
    i32.const 2
    i32.shl
    i32.const 6316
    i32.add
    i64.load32_u
    i64.const 32
    i64.shl
    i64.or
    i64.store
    br $while-continue|0
   end
  end
  local.get $1
  i32.const 100
  i32.ge_u
  if
   local.get $5
   local.get $0
   i32.const 2
   i32.sub
   local.tee $0
   i32.const 1
   i32.shl
   i32.add
   local.get $1
   i32.const 100
   i32.rem_u
   i32.const 2
   i32.shl
   i32.const 6316
   i32.add
   i32.load
   i32.store
   local.get $1
   i32.const 100
   i32.div_u
   local.set $1
  end
  local.get $1
  i32.const 10
  i32.ge_u
  if
   local.get $5
   local.get $0
   i32.const 2
   i32.sub
   i32.const 1
   i32.shl
   i32.add
   local.get $1
   i32.const 2
   i32.shl
   i32.const 6316
   i32.add
   i32.load
   i32.store
  else
   local.get $5
   local.get $0
   i32.const 1
   i32.sub
   i32.const 1
   i32.shl
   i32.add
   local.get $1
   i32.const 48
   i32.add
   i32.store16
  end
  local.get $4
  if
   local.get $3
   i32.const 45
   i32.store16
  end
  local.get $3
 )
 (func $~lib/as-proto/assembly/internal/FixedReader/FixedReader#skipType (param $0 i32) (param $1 i32)
  block $break|0
   block $case5|0
    block $case4|0
     block $case3|0
      block $case2|0
       block $case1|0
        block $case0|0
         local.get $1
         br_table $case0|0 $case1|0 $case2|0 $case3|0 $case5|0 $case4|0 $case5|0
        end
        local.get $0
        i32.const 0
        call $~lib/as-proto/assembly/internal/FixedReader/FixedReader#skip
        br $break|0
       end
       local.get $0
       i32.const 8
       call $~lib/as-proto/assembly/internal/FixedReader/FixedReader#skip
       br $break|0
      end
      local.get $0
      local.get $0
      call $~lib/as-proto/assembly/internal/FixedReader/FixedReader#varint32
      call $~lib/as-proto/assembly/internal/FixedReader/FixedReader#skip
      br $break|0
     end
     loop $while-continue|1
      local.get $0
      call $~lib/as-proto/assembly/internal/FixedReader/FixedReader#varint32
      i32.const 7
      i32.and
      local.tee $1
      i32.const 4
      i32.ne
      if
       local.get $0
       local.get $1
       call $~lib/as-proto/assembly/internal/FixedReader/FixedReader#skipType
       br $while-continue|1
      end
     end
     br $break|0
    end
    local.get $0
    i32.const 4
    call $~lib/as-proto/assembly/internal/FixedReader/FixedReader#skip
    br $break|0
   end
   i32.const 6048
   local.get $1
   call $~lib/util/number/itoa32
   call $~lib/string/String.__concat
   i32.const 5936
   i32.const 131
   i32.const 9
   call $~lib/builtins/abort
   unreachable
  end
 )
 (func $~lib/as-proto/assembly/internal/FixedReader/FixedReader#varint64 (param $0 i32) (result i64)
  (local $1 i64)
  (local $2 i32)
  (local $3 i64)
  local.get $0
  local.get $0
  i32.load
  local.tee $2
  i32.const 1
  i32.add
  i32.store
  block $folding-inner1
   block $folding-inner0
    local.get $0
    i32.load
    local.get $0
    i32.load offset=4
    i32.gt_u
    br_if $folding-inner0
    local.get $2
    i64.load8_u
    local.tee $3
    i64.const 127
    i64.and
    local.set $1
    local.get $3
    i64.const 128
    i64.lt_u
    br_if $folding-inner1
    local.get $0
    i32.load
    local.set $2
    local.get $0
    local.get $0
    i32.load
    i32.const 1
    i32.add
    i32.store
    local.get $0
    i32.load
    local.get $0
    i32.load offset=4
    i32.gt_u
    br_if $folding-inner0
    local.get $1
    local.get $2
    i64.load8_u
    local.tee $3
    i64.const 127
    i64.and
    i64.const 7
    i64.shl
    i64.or
    local.set $1
    local.get $3
    i64.const 128
    i64.lt_u
    br_if $folding-inner1
    local.get $0
    i32.load
    local.set $2
    local.get $0
    local.get $0
    i32.load
    i32.const 1
    i32.add
    i32.store
    local.get $0
    i32.load
    local.get $0
    i32.load offset=4
    i32.gt_u
    br_if $folding-inner0
    local.get $1
    local.get $2
    i64.load8_u
    local.tee $3
    i64.const 127
    i64.and
    i64.const 14
    i64.shl
    i64.or
    local.set $1
    local.get $3
    i64.const 128
    i64.lt_u
    br_if $folding-inner1
    local.get $0
    i32.load
    local.set $2
    local.get $0
    local.get $0
    i32.load
    i32.const 1
    i32.add
    i32.store
    local.get $0
    i32.load
    local.get $0
    i32.load offset=4
    i32.gt_u
    br_if $folding-inner0
    local.get $1
    local.get $2
    i64.load8_u
    local.tee $3
    i64.const 127
    i64.and
    i64.const 21
    i64.shl
    i64.or
    local.set $1
    local.get $3
    i64.const 128
    i64.lt_u
    br_if $folding-inner1
    local.get $0
    i32.load
    local.set $2
    local.get $0
    local.get $0
    i32.load
    i32.const 1
    i32.add
    i32.store
    local.get $0
    i32.load
    local.get $0
    i32.load offset=4
    i32.gt_u
    br_if $folding-inner0
    local.get $1
    local.get $2
    i64.load8_u
    local.tee $3
    i64.const 127
    i64.and
    i64.const 28
    i64.shl
    i64.or
    local.set $1
    local.get $3
    i64.const 128
    i64.lt_u
    br_if $folding-inner1
    local.get $0
    i32.load
    local.set $2
    local.get $0
    local.get $0
    i32.load
    i32.const 1
    i32.add
    i32.store
    local.get $0
    i32.load
    local.get $0
    i32.load offset=4
    i32.gt_u
    br_if $folding-inner0
    local.get $1
    local.get $2
    i64.load8_u
    local.tee $3
    i64.const 127
    i64.and
    i64.const 35
    i64.shl
    i64.or
    local.set $1
    local.get $3
    i64.const 128
    i64.lt_u
    br_if $folding-inner1
    local.get $0
    i32.load
    local.set $2
    local.get $0
    local.get $0
    i32.load
    i32.const 1
    i32.add
    i32.store
    local.get $0
    i32.load
    local.get $0
    i32.load offset=4
    i32.gt_u
    br_if $folding-inner0
    local.get $1
    local.get $2
    i64.load8_u
    local.tee $3
    i64.const 127
    i64.and
    i64.const 42
    i64.shl
    i64.or
    local.set $1
    local.get $3
    i64.const 128
    i64.lt_u
    br_if $folding-inner1
    local.get $0
    i32.load
    local.set $2
    local.get $0
    local.get $0
    i32.load
    i32.const 1
    i32.add
    i32.store
    local.get $0
    i32.load
    local.get $0
    i32.load offset=4
    i32.gt_u
    br_if $folding-inner0
    local.get $1
    local.get $2
    i64.load8_u
    local.tee $3
    i64.const 127
    i64.and
    i64.const 49
    i64.shl
    i64.or
    local.set $1
    local.get $3
    i64.const 128
    i64.lt_u
    br_if $folding-inner1
    local.get $0
    i32.load
    local.set $2
    local.get $0
    local.get $0
    i32.load
    i32.const 1
    i32.add
    i32.store
    local.get $0
    i32.load
    local.get $0
    i32.load offset=4
    i32.gt_u
    br_if $folding-inner0
    local.get $1
    local.get $2
    i64.load8_u
    local.tee $3
    i64.const 127
    i64.and
    i64.const 56
    i64.shl
    i64.or
    local.set $1
    local.get $3
    i64.const 128
    i64.lt_u
    br_if $folding-inner1
    local.get $0
    i32.load
    local.set $2
    local.get $0
    local.get $0
    i32.load
    i32.const 1
    i32.add
    i32.store
    local.get $0
    i32.load
    local.get $0
    i32.load offset=4
    i32.gt_u
    br_if $folding-inner0
    local.get $1
    local.get $2
    i64.load8_u
    i64.const 1
    i64.and
    i64.const 63
    i64.shl
    i64.or
    local.set $1
    br $folding-inner1
   end
   i32.const 5232
   i32.const 5936
   i32.const 210
   i32.const 5
   call $~lib/builtins/abort
   unreachable
  end
  local.get $1
 )
 (func $~lib/@artela/aspect-libs/common/wraptypes/basic-types/AString#store (param $0 i32) (result i32)
  (local $1 i32)
  (local $2 i32)
  (local $3 i32)
  (local $4 i32)
  (local $5 i32)
  (local $6 i32)
  (local $7 i32)
  local.get $0
  i32.load
  i32.load offset=4
  i32.const 6
  i32.add
  call $~lib/rt/stub/__alloc
  local.tee $7
  local.get $0
  i32.load
  local.tee $1
  i32.load16_s
  i32.extend16_s
  i32.store16
  local.get $7
  local.get $1
  i32.load offset=4
  i32.store offset=2
  local.get $0
  i32.load
  drop
  local.get $7
  i32.const 6
  i32.add
  local.set $6
  local.get $0
  i32.load offset=4
  local.set $2
  i32.const 1
  global.set $~argumentsLength
  local.get $2
  local.set $1
  i32.const 0
  local.set $0
  local.get $2
  local.get $2
  i32.const 20
  i32.sub
  i32.load offset=16
  i32.add
  local.set $4
  loop $while-continue|0
   local.get $1
   local.get $4
   i32.lt_u
   if
    local.get $1
    i32.load16_u
    local.tee $3
    i32.const 128
    i32.lt_u
    if (result i32)
     local.get $0
     i32.const 1
     i32.add
    else
     local.get $3
     i32.const 2048
     i32.lt_u
     if (result i32)
      local.get $0
      i32.const 2
      i32.add
     else
      local.get $3
      i32.const 64512
      i32.and
      i32.const 55296
      i32.eq
      local.get $1
      i32.const 2
      i32.add
      local.get $4
      i32.lt_u
      i32.and
      if
       local.get $1
       i32.load16_u offset=2
       i32.const 64512
       i32.and
       i32.const 56320
       i32.eq
       if
        local.get $0
        i32.const 4
        i32.add
        local.set $0
        local.get $1
        i32.const 4
        i32.add
        local.set $1
        br $while-continue|0
       end
      end
      local.get $0
      i32.const 3
      i32.add
     end
    end
    local.set $0
    local.get $1
    i32.const 2
    i32.add
    local.set $1
    br $while-continue|0
   end
  end
  local.get $0
  i32.const 1
  call $~lib/rt/stub/__new
  local.set $1
  local.get $2
  local.get $2
  i32.const 20
  i32.sub
  i32.load offset=16
  i32.const -2
  i32.and
  i32.add
  local.set $4
  local.get $1
  local.set $0
  loop $while-continue|00
   local.get $2
   local.get $4
   i32.lt_u
   if
    local.get $2
    i32.load16_u
    local.tee $5
    i32.const 128
    i32.lt_u
    if (result i32)
     local.get $0
     local.get $5
     i32.store8
     local.get $0
     i32.const 1
     i32.add
    else
     local.get $5
     i32.const 2048
     i32.lt_u
     if (result i32)
      local.get $0
      local.get $5
      i32.const 6
      i32.shr_u
      i32.const 192
      i32.or
      local.get $5
      i32.const 63
      i32.and
      i32.const 128
      i32.or
      i32.const 8
      i32.shl
      i32.or
      i32.store16
      local.get $0
      i32.const 2
      i32.add
     else
      local.get $5
      i32.const 63488
      i32.and
      i32.const 55296
      i32.eq
      if
       local.get $5
       i32.const 56320
       i32.lt_u
       local.get $2
       i32.const 2
       i32.add
       local.get $4
       i32.lt_u
       i32.and
       if
        local.get $2
        i32.load16_u offset=2
        local.tee $3
        i32.const 64512
        i32.and
        i32.const 56320
        i32.eq
        if
         local.get $0
         local.get $5
         i32.const 1023
         i32.and
         i32.const 10
         i32.shl
         i32.const 65536
         i32.add
         local.get $3
         i32.const 1023
         i32.and
         i32.or
         local.tee $3
         i32.const 63
         i32.and
         i32.const 128
         i32.or
         i32.const 24
         i32.shl
         local.get $3
         i32.const 6
         i32.shr_u
         i32.const 63
         i32.and
         i32.const 128
         i32.or
         i32.const 16
         i32.shl
         i32.or
         local.get $3
         i32.const 12
         i32.shr_u
         i32.const 63
         i32.and
         i32.const 128
         i32.or
         i32.const 8
         i32.shl
         i32.or
         local.get $3
         i32.const 18
         i32.shr_u
         i32.const 240
         i32.or
         i32.or
         i32.store
         local.get $0
         i32.const 4
         i32.add
         local.set $0
         local.get $2
         i32.const 4
         i32.add
         local.set $2
         br $while-continue|00
        end
       end
      end
      local.get $0
      local.get $5
      i32.const 12
      i32.shr_u
      i32.const 224
      i32.or
      local.get $5
      i32.const 6
      i32.shr_u
      i32.const 63
      i32.and
      i32.const 128
      i32.or
      i32.const 8
      i32.shl
      i32.or
      i32.store16
      local.get $0
      local.get $5
      i32.const 63
      i32.and
      i32.const 128
      i32.or
      i32.store8 offset=2
      local.get $0
      i32.const 3
      i32.add
     end
    end
    local.set $0
    local.get $2
    i32.const 2
    i32.add
    local.set $2
    br $while-continue|00
   end
  end
  i32.const 1
  global.set $~argumentsLength
  local.get $1
  i32.const 20
  i32.sub
  i32.load offset=16
  local.set $0
  i32.const 12
  i32.const 9
  call $~lib/rt/stub/__new
  local.tee $2
  local.get $1
  i32.store
  local.get $2
  local.get $0
  i32.store offset=8
  local.get $2
  local.get $1
  i32.store offset=4
  i32.const 0
  local.set $0
  loop $for-loop|0
   local.get $0
   local.get $2
   i32.load offset=8
   i32.lt_s
   if
    local.get $6
    local.get $2
    local.get $0
    call $~lib/typedarray/Uint8Array#__get
    i32.const 1
    call $~lib/memory/memory.fill
    local.get $6
    i32.const 1
    i32.add
    local.set $6
    local.get $0
    i32.const 1
    i32.add
    local.set $0
    br $for-loop|0
   end
  end
  local.get $7
 )
 (func $~lib/@artela/aspect-libs/common/wraptypes/bigint/BigInt#constructor (param $0 i32) (param $1 i32) (result i32)
  (local $2 i32)
  i32.const 9
  i32.const 59
  call $~lib/rt/stub/__new
  local.tee $2
  i32.const 0
  i32.store
  local.get $2
  i32.const 0
  i32.store offset=4
  local.get $2
  i32.const 0
  i32.store8 offset=8
  local.get $2
  i32.const 12
  i32.const 60
  call $~lib/rt/stub/__new
  local.get $0
  i32.const 2
  call $~lib/arraybuffer/ArrayBufferView#constructor
  i32.store
  local.get $2
  local.get $1
  i32.store8 offset=8
  local.get $2
 )
 (func $~lib/typedarray/Uint32Array#__set (param $0 i32) (param $1 i32) (param $2 i32)
  local.get $1
  local.get $0
  i32.load offset=8
  i32.const 2
  i32.shr_u
  i32.ge_u
  if
   i32.const 5232
   i32.const 5296
   i32.const 889
   i32.const 64
   call $~lib/builtins/abort
   unreachable
  end
  local.get $0
  i32.load offset=4
  local.get $1
  i32.const 2
  i32.shl
  i32.add
  local.get $2
  i32.store
 )
 (func $~lib/typedarray/Uint32Array#__get (param $0 i32) (param $1 i32) (result i32)
  local.get $1
  local.get $0
  i32.load offset=8
  i32.const 2
  i32.shr_u
  i32.ge_u
  if
   i32.const 5232
   i32.const 5296
   i32.const 878
   i32.const 64
   call $~lib/builtins/abort
   unreachable
  end
  local.get $0
  i32.load offset=4
  local.get $1
  i32.const 2
  i32.shl
  i32.add
  i32.load
 )
 (func $~lib/@artela/aspect-libs/common/wraptypes/bigint/BigInt.fromUInt16 (result i32)
  (local $0 i32)
  i32.const 5
  i32.const 0
  call $~lib/@artela/aspect-libs/common/wraptypes/bigint/BigInt#constructor
  local.tee $0
  i32.load
  i32.const 0
  i32.const 0
  call $~lib/typedarray/Uint32Array#__set
  local.get $0
  local.get $0
  i32.load
  i32.const 0
  call $~lib/typedarray/Uint32Array#__get
  i32.const 0
  i32.ne
  i32.store offset=4
  local.get $0
 )
 (func $~lib/@artela/aspect-libs/common/wraptypes/bigint/BigInt#trimLeadingZeros (param $0 i32)
  (local $1 i32)
  loop $while-continue|0
   local.get $0
   i32.load offset=4
   local.tee $1
   i32.const 0
   i32.gt_s
   if (result i32)
    local.get $0
    i32.load
    local.get $1
    i32.const 1
    i32.sub
    call $~lib/typedarray/Uint32Array#__get
   else
    i32.const 1
   end
   i32.eqz
   if
    local.get $0
    local.get $0
    i32.load offset=4
    i32.const 1
    i32.sub
    i32.store offset=4
    br $while-continue|0
   end
  end
  local.get $0
  i32.load offset=4
  i32.eqz
  if
   local.get $0
   i32.const 0
   i32.store8 offset=8
  end
 )
 (func $~lib/staticarray/StaticArray<~lib/string/String>#join (param $0 i32) (result i32)
  (local $1 i32)
  (local $2 i32)
  (local $3 i32)
  (local $4 i32)
  (local $5 i32)
  (local $6 i32)
  (local $7 i32)
  i32.const 1424
  local.set $3
  block $__inlined_func$~lib/util/string/joinStringArray$399
   local.get $0
   i32.const 20
   i32.sub
   i32.load offset=16
   i32.const 2
   i32.shr_u
   local.tee $7
   i32.const 1
   i32.sub
   local.tee $5
   i32.const 0
   i32.lt_s
   br_if $__inlined_func$~lib/util/string/joinStringArray$399
   local.get $5
   i32.eqz
   if
    local.get $0
    i32.load
    local.tee $3
    i32.eqz
    if
     i32.const 1424
     local.set $3
    end
    br $__inlined_func$~lib/util/string/joinStringArray$399
   end
   loop $for-loop|0
    local.get $4
    local.get $7
    i32.lt_s
    if
     local.get $0
     local.get $4
     i32.const 2
     i32.shl
     i32.add
     i32.load
     local.tee $3
     if
      local.get $1
      local.get $3
      i32.const 20
      i32.sub
      i32.load offset=16
      i32.const 1
      i32.shr_u
      i32.add
      local.set $1
     end
     local.get $4
     i32.const 1
     i32.add
     local.set $4
     br $for-loop|0
    end
   end
   local.get $1
   local.get $5
   i32.const 1420
   i32.load
   i32.const 1
   i32.shr_u
   local.tee $1
   i32.mul
   i32.add
   i32.const 1
   i32.shl
   i32.const 2
   call $~lib/rt/stub/__new
   local.set $3
   loop $for-loop|1
    local.get $5
    local.get $6
    i32.gt_s
    if
     local.get $0
     local.get $6
     i32.const 2
     i32.shl
     i32.add
     i32.load
     local.tee $4
     if
      local.get $3
      local.get $2
      i32.const 1
      i32.shl
      i32.add
      local.get $4
      local.get $4
      i32.const 20
      i32.sub
      i32.load offset=16
      i32.const 1
      i32.shr_u
      local.tee $4
      i32.const 1
      i32.shl
      call $~lib/memory/memory.copy
      local.get $2
      local.get $4
      i32.add
      local.set $2
     end
     local.get $1
     if
      local.get $3
      local.get $2
      i32.const 1
      i32.shl
      i32.add
      i32.const 1424
      local.get $1
      i32.const 1
      i32.shl
      call $~lib/memory/memory.copy
      local.get $1
      local.get $2
      i32.add
      local.set $2
     end
     local.get $6
     i32.const 1
     i32.add
     local.set $6
     br $for-loop|1
    end
   end
   local.get $0
   local.get $5
   i32.const 2
   i32.shl
   i32.add
   i32.load
   local.tee $0
   if
    local.get $3
    local.get $2
    i32.const 1
    i32.shl
    i32.add
    local.get $0
    local.get $0
    i32.const 20
    i32.sub
    i32.load offset=16
    i32.const -2
    i32.and
    call $~lib/memory/memory.copy
   end
  end
  local.get $3
 )
 (func $~lib/@artela/aspect-libs/common/wraptypes/bigint/BigInt.fromDigits@varargs (param $0 i32) (param $1 i32) (param $2 i32) (result i32)
  (local $3 i32)
  (local $4 i32)
  block $3of3
   block $2of3
    block $1of3
     block $0of3
      block $outOfRange
       global.get $~argumentsLength
       i32.const 1
       i32.sub
       br_table $0of3 $1of3 $2of3 $3of3 $outOfRange
      end
      unreachable
     end
     i32.const 0
     local.set $1
    end
    local.get $0
    i32.load offset=8
    i32.const 2
    i32.shr_u
    local.set $2
   end
   local.get $0
   i32.load offset=8
   i32.const 2
   i32.shr_u
   local.set $4
  end
  local.get $4
  local.get $0
  i32.load offset=8
  i32.const 2
  i32.shr_u
  local.tee $3
  i32.ge_s
  if
   local.get $4
   local.set $3
  end
  i32.const 5
  local.get $3
  i32.const 5
  i32.rem_s
  local.tee $4
  i32.sub
  local.get $3
  i32.add
  local.get $3
  local.get $4
  select
  local.get $1
  call $~lib/@artela/aspect-libs/common/wraptypes/bigint/BigInt#constructor
  local.set $3
  i32.const 0
  local.set $1
  loop $for-loop|0
   local.get $1
   local.get $0
   i32.load offset=8
   i32.const 2
   i32.shr_u
   i32.lt_s
   if
    local.get $3
    i32.load
    local.get $1
    local.get $0
    local.get $1
    call $~lib/typedarray/Uint32Array#__get
    call $~lib/typedarray/Uint32Array#__set
    local.get $1
    i32.const 1
    i32.add
    local.set $1
    br $for-loop|0
   end
  end
  local.get $3
  local.get $2
  i32.store offset=4
  local.get $3
 )
 (func $~lib/@artela/aspect-libs/common/wraptypes/bigint/BigInt#magCompareTo (param $0 i32) (param $1 i32) (result i32)
  (local $2 i32)
  local.get $0
  i32.load offset=4
  local.get $1
  i32.load offset=4
  i32.gt_s
  if
   i32.const 1
   return
  end
  local.get $0
  i32.load offset=4
  local.get $1
  i32.load offset=4
  i32.lt_s
  if
   i32.const -1
   return
  end
  local.get $0
  i32.load offset=4
  i32.const 1
  i32.sub
  local.set $2
  loop $for-loop|0
   local.get $2
   i32.const 0
   i32.ge_s
   if
    local.get $0
    i32.load
    local.get $2
    call $~lib/typedarray/Uint32Array#__get
    local.get $1
    i32.load
    local.get $2
    call $~lib/typedarray/Uint32Array#__get
    i32.ne
    if
     local.get $0
     i32.load
     local.get $2
     call $~lib/typedarray/Uint32Array#__get
     local.get $1
     i32.load
     local.get $2
     call $~lib/typedarray/Uint32Array#__get
     i32.lt_u
     if
      i32.const -1
      return
     end
     i32.const 1
     return
    end
    local.get $2
    i32.const 1
    i32.sub
    local.set $2
    br $for-loop|0
   end
  end
  i32.const 0
 )
 (func $~lib/array/Array<i32>#push (param $0 i32) (param $1 i32) (result i32)
  (local $2 i32)
  (local $3 i32)
  (local $4 i32)
  (local $5 i32)
  (local $6 i32)
  (local $7 i32)
  local.get $0
  i32.load offset=12
  local.tee $4
  i32.const 1
  i32.add
  local.tee $2
  local.get $0
  i32.load offset=8
  local.tee $3
  i32.const 2
  i32.shr_u
  i32.gt_u
  if
   local.get $2
   i32.const 268435455
   i32.gt_u
   if
    i32.const 1280
    i32.const 8672
    i32.const 19
    i32.const 48
    call $~lib/builtins/abort
    unreachable
   end
   local.get $0
   i32.load
   local.tee $5
   i32.const 1073741820
   local.get $3
   i32.const 1
   i32.shl
   local.tee $6
   local.get $6
   i32.const 1073741820
   i32.ge_u
   select
   local.tee $6
   i32.const 8
   local.get $2
   local.get $2
   i32.const 8
   i32.le_u
   select
   i32.const 2
   i32.shl
   local.tee $7
   local.get $6
   local.get $7
   i32.gt_u
   select
   local.tee $6
   call $~lib/rt/stub/__renew
   local.tee $7
   local.get $3
   i32.add
   i32.const 0
   local.get $6
   local.get $3
   i32.sub
   call $~lib/memory/memory.fill
   local.get $5
   local.get $7
   i32.ne
   if
    local.get $0
    local.get $7
    i32.store
    local.get $0
    local.get $7
    i32.store offset=4
   end
   local.get $0
   local.get $6
   i32.store offset=8
  end
  local.get $0
  i32.load offset=4
  local.get $4
  i32.const 2
  i32.shl
  i32.add
  local.get $1
  i32.store
  local.get $0
  local.get $2
  i32.store offset=12
  local.get $2
 )
 (func $~lib/@artela/aspect-libs/common/wraptypes/bigint/BigInt#toString (param $0 i32) (result i32)
  (local $1 i64)
  (local $2 i32)
  (local $3 i32)
  (local $4 i32)
  (local $5 i32)
  (local $6 i32)
  (local $7 i32)
  (local $8 i32)
  (local $9 i32)
  (local $10 i32)
  (local $11 i32)
  local.get $0
  i32.load offset=4
  i32.eqz
  if
   i32.const 6304
   return
  end
  i32.const 8560
  i32.const 1424
  local.get $0
  i32.load8_u offset=8
  select
  local.set $6
  local.get $0
  i32.load
  local.set $2
  local.get $0
  i32.load offset=4
  local.set $0
  i32.const 3
  global.set $~argumentsLength
  local.get $2
  i32.const 0
  local.get $0
  call $~lib/@artela/aspect-libs/common/wraptypes/bigint/BigInt.fromDigits@varargs
  local.set $0
  call $~lib/@artela/aspect-libs/common/wraptypes/bigint/BigInt.fromUInt16
  local.set $7
  i32.const 8
  i32.const 8592
  call $~lib/rt/__newArray
  local.set $5
  loop $while-continue|0
   i32.const -1
   local.set $2
   block $__inlined_func$~lib/@artela/aspect-libs/common/wraptypes/bigint/BigInt#compareTo$707
    local.get $0
    i32.load8_u offset=8
    if (result i32)
     local.get $7
     i32.load8_u offset=8
    else
     i32.const 1
    end
    i32.eqz
    br_if $__inlined_func$~lib/@artela/aspect-libs/common/wraptypes/bigint/BigInt#compareTo$707
    i32.const 1
    local.set $2
    local.get $0
    i32.load8_u offset=8
    if (result i32)
     i32.const 0
    else
     local.get $7
     i32.load8_u offset=8
    end
    br_if $__inlined_func$~lib/@artela/aspect-libs/common/wraptypes/bigint/BigInt#compareTo$707
    local.get $0
    i32.load8_u offset=8
    if
     local.get $7
     local.get $0
     call $~lib/@artela/aspect-libs/common/wraptypes/bigint/BigInt#magCompareTo
     local.set $2
     br $__inlined_func$~lib/@artela/aspect-libs/common/wraptypes/bigint/BigInt#compareTo$707
    end
    local.get $0
    local.get $7
    call $~lib/@artela/aspect-libs/common/wraptypes/bigint/BigInt#magCompareTo
    local.set $2
   end
   local.get $2
   if
    block $__inlined_func$~lib/@artela/aspect-libs/common/wraptypes/bigint/BigInt#modInt$714 (result i32)
     i32.const 0
     local.get $0
     i32.load offset=4
     i32.eqz
     br_if $__inlined_func$~lib/@artela/aspect-libs/common/wraptypes/bigint/BigInt#modInt$714
     drop
     i32.const 1
     local.set $2
     block $__inlined_func$~lib/@artela/aspect-libs/common/wraptypes/bigint/BigInt.isPow2$422
      loop $for-loop|0
       local.get $2
       i32.const 28
       i32.lt_s
       if
        i32.const 1
        local.get $2
        i32.shl
        i32.const 10
        i32.eq
        br_if $__inlined_func$~lib/@artela/aspect-libs/common/wraptypes/bigint/BigInt.isPow2$422
        local.get $2
        i32.const 1
        i32.add
        local.set $2
        br $for-loop|0
       end
      end
      i32.const 0
      local.set $2
     end
     local.get $2
     if
      local.get $0
      i32.load
      i32.const 0
      call $~lib/typedarray/Uint32Array#__get
      i32.const 1
      local.get $2
      i32.shl
      i32.const 1
      i32.sub
      i32.and
      br $__inlined_func$~lib/@artela/aspect-libs/common/wraptypes/bigint/BigInt#modInt$714
     end
     i64.const 0
     local.set $1
     local.get $0
     i32.load offset=4
     i32.const 1
     i32.sub
     local.set $3
     loop $for-loop|00
      local.get $3
      i32.const 0
      i32.ge_s
      if
       local.get $0
       i32.load
       local.get $3
       call $~lib/typedarray/Uint32Array#__get
       i64.extend_i32_u
       local.get $1
       i64.const 28
       i64.shl
       i64.or
       local.tee $1
       i64.const 10
       i64.ge_u
       if
        local.get $1
        local.get $1
        i64.const 10
        i64.div_u
        i32.wrap_i64
        i64.extend_i32_u
        i64.const 10
        i64.mul
        i64.sub
        local.set $1
       end
       local.get $3
       i32.const 1
       i32.sub
       local.set $3
       br $for-loop|00
      end
     end
     local.get $1
     i32.wrap_i64
    end
    local.set $8
    block $__inlined_func$~lib/@artela/aspect-libs/common/wraptypes/bigint/BigInt#inplaceDivInt$715
     local.get $0
     i32.load offset=4
     i32.eqz
     br_if $__inlined_func$~lib/@artela/aspect-libs/common/wraptypes/bigint/BigInt#inplaceDivInt$715
     i32.const 1
     local.set $2
     block $__inlined_func$~lib/@artela/aspect-libs/common/wraptypes/bigint/BigInt.isPow2$443
      loop $for-loop|01
       local.get $2
       i32.const 28
       i32.lt_s
       if
        i32.const 1
        local.get $2
        i32.shl
        i32.const 10
        i32.eq
        br_if $__inlined_func$~lib/@artela/aspect-libs/common/wraptypes/bigint/BigInt.isPow2$443
        local.get $2
        i32.const 1
        i32.add
        local.set $2
        br $for-loop|01
       end
      end
      i32.const 0
      local.set $2
     end
     local.get $2
     if
      block $__inlined_func$~lib/@artela/aspect-libs/common/wraptypes/bigint/BigInt#divPowTwo$35 (result i32)
       i32.const 0
       local.set $4
       local.get $0
       i32.load
       local.set $3
       local.get $0
       i32.load8_u offset=8
       local.set $9
       local.get $0
       i32.load offset=4
       local.set $0
       i32.const 3
       global.set $~argumentsLength
       local.get $3
       local.get $9
       local.get $0
       call $~lib/@artela/aspect-libs/common/wraptypes/bigint/BigInt.fromDigits@varargs
       local.tee $9
       local.get $2
       i32.const 0
       i32.le_s
       br_if $__inlined_func$~lib/@artela/aspect-libs/common/wraptypes/bigint/BigInt#divPowTwo$35
       drop
       local.get $2
       i32.const 28
       i32.ge_s
       if
        block $__inlined_func$~lib/@artela/aspect-libs/common/wraptypes/bigint/BigInt#divBasisPow$709
         local.get $2
         i32.const 28
         i32.div_s
         local.tee $0
         i32.const 0
         i32.le_s
         br_if $__inlined_func$~lib/@artela/aspect-libs/common/wraptypes/bigint/BigInt#divBasisPow$709
         local.get $0
         local.get $9
         i32.load offset=4
         i32.ge_s
         if
          local.get $9
          i32.const 0
          i32.store offset=4
          local.get $9
          call $~lib/@artela/aspect-libs/common/wraptypes/bigint/BigInt#trimLeadingZeros
          br $__inlined_func$~lib/@artela/aspect-libs/common/wraptypes/bigint/BigInt#divBasisPow$709
         end
         local.get $0
         local.set $3
         loop $for-loop|02
          local.get $4
          local.get $9
          i32.load offset=4
          local.get $0
          i32.sub
          i32.lt_s
          if
           local.get $9
           i32.load
           local.tee $10
           local.get $4
           local.get $10
           local.get $3
           call $~lib/typedarray/Uint32Array#__get
           call $~lib/typedarray/Uint32Array#__set
           local.get $4
           i32.const 1
           i32.add
           local.set $4
           local.get $3
           i32.const 1
           i32.add
           local.set $3
           br $for-loop|02
          end
         end
         loop $for-loop|1
          local.get $4
          local.get $9
          i32.load offset=4
          i32.lt_s
          if
           local.get $9
           i32.load
           local.get $4
           i32.const 0
           call $~lib/typedarray/Uint32Array#__set
           local.get $4
           i32.const 1
           i32.add
           local.set $4
           br $for-loop|1
          end
         end
         local.get $9
         local.get $9
         i32.load offset=4
         local.get $0
         i32.sub
         i32.store offset=4
        end
       end
       local.get $2
       i32.const 28
       i32.rem_s
       local.tee $10
       if
        i32.const 1
        local.get $10
        i32.shl
        i32.const 1
        i32.sub
        local.set $4
        i32.const 28
        local.get $10
        i32.sub
        local.set $11
        i32.const 0
        local.set $0
        local.get $9
        i32.load offset=4
        i32.const 1
        i32.sub
        local.set $3
        loop $for-loop|003
         local.get $3
         i32.const 0
         i32.ge_s
         if
          local.get $9
          i32.load
          local.get $3
          call $~lib/typedarray/Uint32Array#__get
          local.get $4
          i32.and
          local.set $2
          local.get $9
          i32.load
          local.get $3
          local.get $0
          local.get $11
          i32.shl
          local.get $9
          i32.load
          local.get $3
          call $~lib/typedarray/Uint32Array#__get
          local.get $10
          i32.shr_u
          i32.or
          call $~lib/typedarray/Uint32Array#__set
          local.get $2
          local.set $0
          local.get $3
          i32.const 1
          i32.sub
          local.set $3
          br $for-loop|003
         end
        end
       end
       local.get $9
       call $~lib/@artela/aspect-libs/common/wraptypes/bigint/BigInt#trimLeadingZeros
       local.get $9
      end
      local.set $0
      br $__inlined_func$~lib/@artela/aspect-libs/common/wraptypes/bigint/BigInt#inplaceDivInt$715
     end
     i64.const 0
     local.set $1
     local.get $0
     i32.load offset=4
     i32.const 1
     i32.sub
     local.set $3
     loop $for-loop|002
      local.get $3
      i32.const 0
      i32.ge_s
      if
       local.get $0
       i32.load
       local.get $3
       call $~lib/typedarray/Uint32Array#__get
       i64.extend_i32_u
       local.get $1
       i64.const 28
       i64.shl
       i64.or
       local.tee $1
       i64.const 10
       i64.ge_u
       if
        local.get $1
        local.get $1
        i64.const 10
        i64.div_u
        i32.wrap_i64
        local.tee $2
        i64.extend_i32_u
        i64.const 10
        i64.mul
        i64.sub
        local.set $1
       else
        i32.const 0
        local.set $2
       end
       local.get $0
       i32.load
       local.get $3
       local.get $2
       call $~lib/typedarray/Uint32Array#__set
       local.get $3
       i32.const 1
       i32.sub
       local.set $3
       br $for-loop|002
      end
     end
     local.get $0
     call $~lib/@artela/aspect-libs/common/wraptypes/bigint/BigInt#trimLeadingZeros
    end
    local.get $8
    i32.const 10
    i32.lt_s
    if (result i32)
     local.get $5
     local.get $8
     i32.const 48
     i32.add
     call $~lib/array/Array<i32>#push
    else
     local.get $5
     local.get $8
     i32.const 87
     i32.add
     call $~lib/array/Array<i32>#push
    end
    drop
    br $while-continue|0
   end
  end
  local.get $5
  i32.load offset=4
  local.set $2
  local.get $5
  i32.load offset=12
  local.tee $3
  i32.const 1
  i32.gt_u
  if
   i32.const 0
   local.set $0
   local.get $3
   i32.const 1
   i32.shr_u
   local.set $4
   local.get $3
   i32.const 1
   i32.sub
   local.set $3
   loop $while-continue|01
    local.get $0
    local.get $4
    i32.lt_u
    if
     local.get $2
     local.get $0
     i32.const 2
     i32.shl
     i32.add
     local.tee $7
     i32.load
     local.set $8
     local.get $7
     local.get $2
     local.get $3
     local.get $0
     i32.sub
     i32.const 2
     i32.shl
     i32.add
     local.tee $7
     i32.load
     i32.store
     local.get $7
     local.get $8
     i32.store
     local.get $0
     i32.const 1
     i32.add
     local.set $0
     br $while-continue|01
    end
   end
  end
  local.get $5
  i32.load offset=12
  local.tee $2
  i32.const 1
  i32.shl
  i32.const 2
  call $~lib/rt/stub/__new
  local.set $3
  local.get $5
  i32.load offset=4
  local.set $4
  i32.const 0
  local.set $0
  loop $for-loop|024
   local.get $0
   local.get $2
   i32.lt_s
   if
    local.get $3
    local.get $0
    i32.const 1
    i32.shl
    i32.add
    local.get $4
    local.get $0
    i32.const 2
    i32.shl
    i32.add
    i32.load
    i32.store16
    local.get $0
    i32.const 1
    i32.add
    local.set $0
    br $for-loop|024
   end
  end
  local.get $6
  local.get $3
  call $~lib/string/String.__concat
 )
 (func $~lib/util/string/strtol<i64> (param $0 i32) (result i64)
  (local $1 i32)
  (local $2 i32)
  (local $3 i32)
  (local $4 i64)
  (local $5 i64)
  (local $6 i32)
  (local $7 i32)
  local.get $0
  i32.const 20
  i32.sub
  i32.load offset=16
  i32.const 1
  i32.shr_u
  local.tee $1
  i32.eqz
  if
   i64.const 0
   return
  end
  local.get $0
  local.tee $2
  i32.load16_u
  local.set $0
  loop $while-continue|0
   block $__inlined_func$~lib/util/string/isSpace$460 (result i32)
    local.get $0
    i32.const 128
    i32.or
    i32.const 160
    i32.eq
    local.get $0
    i32.const 9
    i32.sub
    i32.const 4
    i32.le_u
    i32.or
    local.get $0
    i32.const 5760
    i32.lt_u
    br_if $__inlined_func$~lib/util/string/isSpace$460
    drop
    i32.const 1
    local.get $0
    i32.const -8192
    i32.add
    i32.const 10
    i32.le_u
    br_if $__inlined_func$~lib/util/string/isSpace$460
    drop
    block $break|0
     block $case6|0
      local.get $0
      i32.const 5760
      i32.eq
      br_if $case6|0
      local.get $0
      i32.const 8232
      i32.eq
      br_if $case6|0
      local.get $0
      i32.const 8233
      i32.eq
      br_if $case6|0
      local.get $0
      i32.const 8239
      i32.eq
      br_if $case6|0
      local.get $0
      i32.const 8287
      i32.eq
      br_if $case6|0
      local.get $0
      i32.const 12288
      i32.eq
      br_if $case6|0
      local.get $0
      i32.const 65279
      i32.eq
      br_if $case6|0
      br $break|0
     end
     i32.const 1
     br $__inlined_func$~lib/util/string/isSpace$460
    end
    i32.const 0
   end
   if
    local.get $2
    i32.const 2
    i32.add
    local.tee $2
    i32.load16_u
    local.set $0
    local.get $1
    i32.const 1
    i32.sub
    local.set $1
    br $while-continue|0
   end
  end
  i64.const 1
  local.set $4
  local.get $0
  i32.const 43
  i32.eq
  local.get $0
  i32.const 45
  i32.eq
  i32.or
  if (result i32)
   local.get $1
   i32.const 1
   i32.sub
   local.tee $1
   i32.eqz
   if
    i64.const 0
    return
   end
   i64.const -1
   i64.const 1
   local.get $0
   i32.const 45
   i32.eq
   select
   local.set $4
   local.get $2
   i32.const 2
   i32.add
   local.tee $2
   i32.load16_u
  else
   local.get $0
  end
  i32.const 48
  i32.eq
  local.get $1
  i32.const 2
  i32.gt_s
  i32.and
  if
   block $break|1
    block $case2|1
     block $case1|1
      local.get $2
      i32.load16_u offset=2
      i32.const 32
      i32.or
      local.tee $0
      i32.const 98
      i32.ne
      if
       local.get $0
       i32.const 111
       i32.eq
       br_if $case1|1
       local.get $0
       i32.const 120
       i32.eq
       br_if $case2|1
       br $break|1
      end
      local.get $2
      i32.const 4
      i32.add
      local.set $2
      local.get $1
      i32.const 2
      i32.sub
      local.set $1
      i32.const 2
      local.set $3
      br $break|1
     end
     local.get $2
     i32.const 4
     i32.add
     local.set $2
     local.get $1
     i32.const 2
     i32.sub
     local.set $1
     i32.const 8
     local.set $3
     br $break|1
    end
    local.get $2
    i32.const 4
    i32.add
    local.set $2
    local.get $1
    i32.const 2
    i32.sub
    local.set $1
    i32.const 16
    local.set $3
   end
  end
  local.get $3
  i32.const 10
  local.get $3
  select
  local.set $3
  local.get $1
  i32.const 1
  i32.sub
  local.set $7
  loop $while-continue|2
   local.get $1
   local.tee $0
   i32.const 1
   i32.sub
   local.set $1
   local.get $0
   if
    block $while-break|2
     local.get $2
     i32.load16_u
     local.tee $6
     i32.const 48
     i32.sub
     local.tee $0
     i32.const 10
     i32.ge_u
     if
      local.get $6
      i32.const 65
      i32.sub
      i32.const 25
      i32.le_u
      if (result i32)
       local.get $6
       i32.const 55
       i32.sub
      else
       local.get $6
       i32.const 87
       i32.sub
       local.get $6
       local.get $6
       i32.const 97
       i32.sub
       i32.const 25
       i32.le_u
       select
      end
      local.set $0
     end
     local.get $0
     local.get $3
     i32.ge_u
     if
      local.get $1
      local.get $7
      i32.eq
      if
       i64.const 0
       return
      end
      br $while-break|2
     end
     local.get $0
     i64.extend_i32_u
     local.get $5
     local.get $3
     i64.extend_i32_s
     i64.mul
     i64.add
     local.set $5
     local.get $2
     i32.const 2
     i32.add
     local.set $2
     br $while-continue|2
    end
   end
  end
  local.get $4
  local.get $5
  i64.mul
 )
 (func $~lib/@artela/aspect-libs/common/helper/convert/fromUint8Array<u64> (param $0 i32) (result i64)
  (local $1 i32)
  (local $2 i32)
  (local $3 i32)
  (local $4 i32)
  (local $5 i32)
  (local $6 i32)
  block $__inlined_func$~lib/@artela/aspect-libs/common/wraptypes/bigint/BigInt#toUInt64$754 (result i64)
   block $__inlined_func$~lib/@artela/aspect-libs/common/wraptypes/bigint/BigInt.fromUint8ArrayWithSign$36 (result i32)
    local.get $0
    i32.load offset=8
    i32.eqz
    if
     call $~lib/@artela/aspect-libs/common/wraptypes/bigint/BigInt.fromUInt16
     br $__inlined_func$~lib/@artela/aspect-libs/common/wraptypes/bigint/BigInt.fromUint8ArrayWithSign$36
    end
    local.get $0
    i32.const 0
    call $~lib/typedarray/Uint8Array#__get
    i32.const 255
    i32.eq
    local.set $6
    i32.const 1
    global.set $~argumentsLength
    local.get $0
    i32.load offset=8
    local.set $4
    i32.const 12
    i32.const 9
    call $~lib/rt/stub/__new
    local.tee $5
    local.get $0
    i32.load
    i32.store
    local.get $5
    local.get $0
    i32.load offset=4
    i32.const 1
    local.get $4
    local.get $4
    i32.const 1
    i32.gt_s
    select
    local.tee $0
    i32.add
    i32.store offset=4
    local.get $5
    local.get $4
    local.get $0
    local.get $0
    local.get $4
    i32.lt_s
    select
    local.get $0
    i32.sub
    i32.store offset=8
    local.get $5
    i32.load offset=8
    i32.const 3
    i32.add
    i32.const 4
    i32.div_s
    local.get $6
    call $~lib/@artela/aspect-libs/common/wraptypes/bigint/BigInt#constructor
    local.set $0
    loop $for-loop|1
     local.get $3
     local.get $5
     i32.load offset=8
     i32.lt_s
     if
      local.get $2
      local.get $5
      local.get $3
      call $~lib/typedarray/Uint8Array#__get
      local.get $1
      i32.shl
      i32.or
      local.set $2
      local.get $1
      i32.const 8
      i32.add
      local.tee $1
      i32.const 255
      i32.and
      i32.const 32
      i32.eq
      if
       local.get $0
       i32.load
       local.set $1
       local.get $0
       local.get $0
       i32.load offset=4
       local.tee $4
       i32.const 1
       i32.add
       i32.store offset=4
       local.get $1
       local.get $4
       local.get $2
       call $~lib/typedarray/Uint32Array#__set
       i32.const 0
       local.set $2
       i32.const 0
       local.set $1
      end
      local.get $3
      i32.const 1
      i32.add
      local.set $3
      br $for-loop|1
     end
    end
    local.get $1
    i32.const 255
    i32.and
    if
     local.get $0
     i32.load
     local.set $1
     local.get $0
     local.get $0
     i32.load offset=4
     local.tee $3
     i32.const 1
     i32.add
     i32.store offset=4
     local.get $1
     local.get $3
     local.get $2
     call $~lib/typedarray/Uint32Array#__set
    end
    local.get $0
    call $~lib/@artela/aspect-libs/common/wraptypes/bigint/BigInt#trimLeadingZeros
    local.get $0
   end
   local.tee $2
   i32.load8_u offset=8
   if
    i32.const 8000
    i32.const 8096
    i32.const 415
    i32.const 7
    call $~lib/builtins/abort
    unreachable
   end
   local.get $2
   i32.load offset=4
   local.tee $0
   i32.const 1
   i32.le_s
   if
    local.get $0
    if (result i64)
     local.get $2
     i32.load
     i32.const 0
     call $~lib/typedarray/Uint32Array#__get
     i64.extend_i32_u
    else
     i64.const 0
    end
    br $__inlined_func$~lib/@artela/aspect-libs/common/wraptypes/bigint/BigInt#toUInt64$754
   end
   local.get $2
   i32.load offset=4
   local.tee $0
   if
    local.get $0
    i32.const 1
    i32.sub
    local.tee $1
    i32.const 28
    i32.mul
    local.set $0
    local.get $2
    i32.load
    local.get $1
    call $~lib/typedarray/Uint32Array#__get
    local.set $1
    loop $while-continue|0
     local.get $1
     if
      local.get $0
      i32.const 1
      i32.add
      local.set $0
      local.get $1
      i32.const 1
      i32.shr_u
      local.set $1
      br $while-continue|0
     end
    end
   else
    i32.const 0
    local.set $0
   end
   local.get $0
   i32.const 64
   i32.gt_s
   if
    i32.const 8404
    local.get $0
    call $~lib/util/number/itoa32
    i32.store
    i32.const 8400
    call $~lib/staticarray/StaticArray<~lib/string/String>#join
    i32.const 8096
    i32.const 422
    i32.const 7
    call $~lib/builtins/abort
    unreachable
   end
   local.get $2
   call $~lib/@artela/aspect-libs/common/wraptypes/bigint/BigInt#toString
   call $~lib/util/string/strtol<i64>
  end
 )
 (func $~lib/@artela/aspect-libs/components/aspect/aspect-property/AspectProperty#get<u64> (param $0 i32) (result i64)
  (local $1 i32)
  (local $2 i32)
  (local $3 i32)
  (local $4 i32)
  (local $5 i32)
  call $~lib/@artela/aspect-libs/common/wraptypes/basic-types/AString#constructor
  local.tee $2
  local.get $0
  i32.store offset=4
  local.get $2
  i32.load
  local.set $4
  local.get $0
  i32.const 20
  i32.sub
  i32.load offset=16
  local.get $0
  i32.add
  local.set $3
  loop $while-continue|0
   local.get $0
   local.get $3
   i32.lt_u
   if
    local.get $0
    i32.load16_u
    local.tee $5
    i32.const 128
    i32.lt_u
    if (result i32)
     local.get $1
     i32.const 1
     i32.add
    else
     local.get $5
     i32.const 2048
     i32.lt_u
     if (result i32)
      local.get $1
      i32.const 2
      i32.add
     else
      local.get $5
      i32.const 64512
      i32.and
      i32.const 55296
      i32.eq
      local.get $0
      i32.const 2
      i32.add
      local.get $3
      i32.lt_u
      i32.and
      if
       local.get $0
       i32.load16_u offset=2
       i32.const 64512
       i32.and
       i32.const 56320
       i32.eq
       if
        local.get $1
        i32.const 4
        i32.add
        local.set $1
        local.get $0
        i32.const 4
        i32.add
        local.set $0
        br $while-continue|0
       end
      end
      local.get $1
      i32.const 3
      i32.add
     end
    end
    local.set $1
    local.get $0
    i32.const 2
    i32.add
    local.set $0
    br $while-continue|0
   end
  end
  local.get $4
  local.get $1
  i32.store offset=4
  local.get $2
  call $~lib/@artela/aspect-libs/common/wraptypes/basic-types/AString#store
  call $~lib/@artela/aspect-libs/hostapi/aspect-property-api/__AspectPropertyApi__.get
  local.set $0
  i32.const 0
  global.set $~argumentsLength
  call $~lib/@artela/aspect-libs/common/wraptypes/basic-types/AUint8Array#constructor@varargs
  local.tee $1
  local.get $0
  call $~lib/@artela/aspect-libs/common/wraptypes/basic-types/AUint8Array#load
  local.get $1
  i32.load offset=4
  call $~lib/@artela/aspect-libs/common/helper/convert/fromUint8Array<u64>
 )
 (func $~lib/string/String#charAt (param $0 i32) (result i32)
  (local $1 i32)
  local.get $0
  i32.const 8812
  i32.load
  i32.const 1
  i32.shr_u
  i32.ge_u
  if
   i32.const 1424
   return
  end
  i32.const 2
  i32.const 2
  call $~lib/rt/stub/__new
  local.tee $1
  local.get $0
  i32.const 1
  i32.shl
  i32.const 8816
  i32.add
  i32.load16_u
  i32.store16
  local.get $1
 )
 (func $~lib/@artela/aspect-libs/common/helper/convert/uint8ArrayToHex (param $0 i32) (result i32)
  (local $1 i32)
  (local $2 i32)
  i32.const 1424
  local.set $1
  loop $for-loop|0
   local.get $2
   local.get $0
   i32.load offset=8
   i32.lt_s
   if
    local.get $1
    local.get $0
    local.get $2
    call $~lib/typedarray/Uint8Array#__get
    local.tee $1
    i32.const 4
    i32.shr_u
    call $~lib/string/String#charAt
    local.get $1
    i32.const 15
    i32.and
    call $~lib/string/String#charAt
    call $~lib/string/String.__concat
    call $~lib/string/String.__concat
    local.set $1
    local.get $2
    i32.const 1
    i32.add
    local.set $2
    br $for-loop|0
   end
  end
  local.get $1
 )
 (func $~lib/@artela/aspect-libs/proto/aspect/v2/uint-data/UintData.decode (param $0 i32) (param $1 i32) (result i32)
  (local $2 i32)
  (local $3 i64)
  (local $4 i32)
  local.get $1
  i32.const 0
  i32.lt_s
  if (result i32)
   local.get $0
   i32.load offset=4
  else
   local.get $0
   i32.load
   local.get $1
   i32.add
  end
  local.set $2
  i32.const 8
  i32.const 62
  call $~lib/rt/stub/__new
  local.tee $4
  i64.const 0
  i64.store
  local.get $4
  i64.const 0
  i64.store
  loop $while-continue|0
   local.get $0
   i32.load
   local.get $2
   i32.lt_u
   if
    block $__inlined_func$~lib/as-proto/assembly/Reader/Reader#uint32@override$31
     local.get $0
     i32.const 8
     i32.sub
     i32.load
     i32.const 10
     i32.eq
     if
      local.get $0
      call $~lib/as-proto/assembly/internal/FixedReader/FixedReader#varint32
      local.set $1
      br $__inlined_func$~lib/as-proto/assembly/Reader/Reader#uint32@override$31
     end
     unreachable
    end
    local.get $1
    i32.const 3
    i32.shr_u
    i32.const 1
    i32.eq
    if
     block $__inlined_func$~lib/as-proto/assembly/Reader/Reader#uint64@override$32
      local.get $0
      i32.const 8
      i32.sub
      i32.load
      i32.const 10
      i32.eq
      if
       local.get $0
       call $~lib/as-proto/assembly/internal/FixedReader/FixedReader#varint64
       local.set $3
       br $__inlined_func$~lib/as-proto/assembly/Reader/Reader#uint64@override$32
      end
      unreachable
     end
     local.get $4
     local.get $3
     i64.store
     br $while-continue|0
    end
    local.get $0
    local.get $1
    i32.const 7
    i32.and
    call $~lib/as-proto/assembly/Reader/Reader#skipType@override
    br $while-continue|0
   end
  end
  local.get $4
 )
 (func $~lib/@artela/aspect-libs/components/aspect/aspect-state/MutableAspectState#get<u64> (param $0 i32) (result i32)
  (local $1 i32)
  i32.const 16
  i32.const 64
  call $~lib/rt/stub/__new
  local.tee $1
  i32.eqz
  if
   i32.const 16
   i32.const 65
   call $~lib/rt/stub/__new
   local.set $1
  end
  local.get $1
  local.get $0
  i32.store offset=12
  local.get $1
  i64.const 0
  i64.store
  local.get $1
  i32.const 0
  i32.store8 offset=8
  local.get $1
  i32.const 12
  i32.const 9
  call $~lib/rt/stub/__new
  i32.const 0
  i32.const 0
  call $~lib/arraybuffer/ArrayBufferView#constructor
  call $~lib/@artela/aspect-libs/common/helper/convert/fromUint8Array<u64>
  i64.store
  local.get $1
 )
 (func $~lib/@artela/aspect-libs/components/aspect/aspect-state/ImmutableStateValue<u64>#unwrap (param $0 i32) (result i64)
  (local $1 i32)
  (local $2 i32)
  (local $3 i32)
  (local $4 i32)
  (local $5 i32)
  (local $6 i32)
  local.get $0
  i32.load8_u offset=8
  i32.eqz
  if
   local.get $0
   i32.load offset=12
   local.set $1
   call $~lib/@artela/aspect-libs/common/wraptypes/basic-types/AString#constructor
   local.tee $3
   local.get $1
   i32.store offset=4
   local.get $3
   i32.load
   local.set $6
   local.get $1
   local.get $1
   i32.const 20
   i32.sub
   i32.load offset=16
   i32.add
   local.set $4
   loop $while-continue|0
    local.get $1
    local.get $4
    i32.lt_u
    if
     local.get $1
     i32.load16_u
     local.tee $5
     i32.const 128
     i32.lt_u
     if (result i32)
      local.get $2
      i32.const 1
      i32.add
     else
      local.get $5
      i32.const 2048
      i32.lt_u
      if (result i32)
       local.get $2
       i32.const 2
       i32.add
      else
       local.get $5
       i32.const 64512
       i32.and
       i32.const 55296
       i32.eq
       local.get $1
       i32.const 2
       i32.add
       local.get $4
       i32.lt_u
       i32.and
       if
        local.get $1
        i32.load16_u offset=2
        i32.const 64512
        i32.and
        i32.const 56320
        i32.eq
        if
         local.get $2
         i32.const 4
         i32.add
         local.set $2
         local.get $1
         i32.const 4
         i32.add
         local.set $1
         br $while-continue|0
        end
       end
       local.get $2
       i32.const 3
       i32.add
      end
     end
     local.set $2
     local.get $1
     i32.const 2
     i32.add
     local.set $1
     br $while-continue|0
    end
   end
   local.get $6
   local.get $2
   i32.store offset=4
   local.get $3
   call $~lib/@artela/aspect-libs/common/wraptypes/basic-types/AString#store
   call $~lib/@artela/aspect-libs/hostapi/aspect-state-api/__AspectStateApi__.get
   local.set $1
   i32.const 0
   global.set $~argumentsLength
   call $~lib/@artela/aspect-libs/common/wraptypes/basic-types/AUint8Array#constructor@varargs
   local.tee $2
   local.get $1
   call $~lib/@artela/aspect-libs/common/wraptypes/basic-types/AUint8Array#load
   local.get $0
   local.get $2
   i32.load offset=4
   call $~lib/@artela/aspect-libs/common/helper/convert/fromUint8Array<u64>
   i64.store
   local.get $0
   i32.const 1
   i32.store8 offset=8
  end
  local.get $0
  i64.load
 )
 (func $~lib/@artela/aspect-libs/package/sys.revert (param $0 i32)
  (local $1 i32)
  (local $2 i32)
  (local $3 i32)
  (local $4 i32)
  (local $5 i32)
  (local $6 i32)
  call $~lib/@artela/aspect-libs/hostapi/util-api/UtilApi.instance
  call $~lib/@artela/aspect-libs/common/wraptypes/basic-types/AString#constructor
  local.tee $3
  local.get $0
  i32.store offset=4
  local.get $3
  i32.load
  local.set $6
  local.get $0
  local.tee $1
  i32.const 20
  i32.sub
  i32.load offset=16
  local.get $1
  i32.add
  local.set $4
  loop $while-continue|0
   local.get $1
   local.get $4
   i32.lt_u
   if
    local.get $1
    i32.load16_u
    local.tee $5
    i32.const 128
    i32.lt_u
    if (result i32)
     local.get $2
     i32.const 1
     i32.add
    else
     local.get $5
     i32.const 2048
     i32.lt_u
     if (result i32)
      local.get $2
      i32.const 2
      i32.add
     else
      local.get $5
      i32.const 64512
      i32.and
      i32.const 55296
      i32.eq
      local.get $1
      i32.const 2
      i32.add
      local.get $4
      i32.lt_u
      i32.and
      if
       local.get $1
       i32.load16_u offset=2
       i32.const 64512
       i32.and
       i32.const 56320
       i32.eq
       if
        local.get $2
        i32.const 4
        i32.add
        local.set $2
        local.get $1
        i32.const 4
        i32.add
        local.set $1
        br $while-continue|0
       end
      end
      local.get $2
      i32.const 3
      i32.add
     end
    end
    local.set $2
    local.get $1
    i32.const 2
    i32.add
    local.set $1
    br $while-continue|0
   end
  end
  local.get $6
  local.get $2
  i32.store offset=4
  local.get $3
  call $~lib/@artela/aspect-libs/common/wraptypes/basic-types/AString#store
  call $~lib/@artela/aspect-libs/hostapi/util-api/__UtilApi__.revert
  local.get $0
  i32.const 3168
  i32.const 26
  i32.const 5
  call $~lib/builtins/abort
  unreachable
 )
 (func $~lib/@artela/aspect-libs/components/aspect/aspect-state/MutableStateValue<u64>#set<u64> (param $0 i32) (param $1 i64)
  (local $2 i32)
  (local $3 i32)
  (local $4 i32)
  (local $5 i32)
  (local $6 i32)
  (local $7 i32)
  (local $8 i32)
  (local $9 i32)
  (local $10 i32)
  local.get $0
  i32.load offset=12
  local.set $4
  block $__inlined_func$~lib/@artela/aspect-libs/common/helper/convert/toUint8Array<u64>$494 (result i32)
   local.get $1
   i64.eqz
   if
    i32.const 12
    i32.const 9
    call $~lib/rt/stub/__new
    i32.const 0
    i32.const 0
    call $~lib/arraybuffer/ArrayBufferView#constructor
    br $__inlined_func$~lib/@artela/aspect-libs/common/helper/convert/toUint8Array<u64>$494
   end
   i32.const 5
   i32.const 0
   call $~lib/@artela/aspect-libs/common/wraptypes/bigint/BigInt#constructor
   local.set $9
   loop $while-continue|0
    local.get $1
    i64.const 0
    i64.ne
    if
     local.get $2
     local.tee $3
     i32.const 1
     i32.add
     local.set $2
     local.get $9
     i32.load
     local.get $3
     local.get $1
     i32.wrap_i64
     i32.const 268435455
     i32.and
     call $~lib/typedarray/Uint32Array#__set
     local.get $1
     i64.const 28
     i64.shr_u
     local.set $1
     br $while-continue|0
    end
   end
   local.get $9
   local.get $2
   i32.store offset=4
   local.get $9
   call $~lib/@artela/aspect-libs/common/wraptypes/bigint/BigInt#trimLeadingZeros
   local.get $9
   i32.load offset=4
   i32.const 2
   i32.shl
   i32.const 1
   i32.add
   local.set $2
   i32.const 12
   i32.const 9
   call $~lib/rt/stub/__new
   local.get $2
   i32.const 0
   call $~lib/arraybuffer/ArrayBufferView#constructor
   local.tee $10
   i32.const 0
   i32.const 255
   i32.const 0
   local.get $9
   i32.load8_u offset=8
   select
   call $~lib/typedarray/Uint8Array#__set
   i32.const 1
   local.set $2
   loop $for-loop|0
    local.get $7
    local.get $9
    i32.load offset=4
    i32.lt_s
    if
     local.get $9
     i32.load
     local.get $7
     call $~lib/typedarray/Uint32Array#__get
     local.set $8
     i32.const 0
     local.set $6
     loop $for-loop|1
      local.get $6
      i32.const 32
      i32.lt_s
      if
       local.get $2
       local.tee $3
       i32.const 1
       i32.add
       local.set $2
       local.get $10
       local.get $3
       local.get $8
       local.get $6
       i32.shr_u
       i32.const 255
       i32.and
       call $~lib/typedarray/Uint8Array#__set
       local.get $6
       i32.const 8
       i32.add
       local.set $6
       br $for-loop|1
      end
     end
     local.get $7
     i32.const 1
     i32.add
     local.set $7
     br $for-loop|0
    end
   end
   local.get $10
   if (result i32)
    local.get $10
   else
    i32.const 12
    i32.const 9
    call $~lib/rt/stub/__new
    i32.const 0
    i32.const 0
    call $~lib/arraybuffer/ArrayBufferView#constructor
   end
  end
  local.set $3
  call $~lib/@artela/aspect-libs/common/wraptypes/basic-types/AString#constructor
  local.tee $6
  local.get $4
  i32.store offset=4
  local.get $6
  i32.load
  local.set $7
  i32.const 0
  local.set $2
  local.get $4
  local.get $4
  i32.const 20
  i32.sub
  i32.load offset=16
  i32.add
  local.set $8
  loop $while-continue|00
   local.get $4
   local.get $8
   i32.lt_u
   if
    local.get $4
    i32.load16_u
    local.tee $9
    i32.const 128
    i32.lt_u
    if (result i32)
     local.get $2
     i32.const 1
     i32.add
    else
     local.get $9
     i32.const 2048
     i32.lt_u
     if (result i32)
      local.get $2
      i32.const 2
      i32.add
     else
      local.get $9
      i32.const 64512
      i32.and
      i32.const 55296
      i32.eq
      local.get $4
      i32.const 2
      i32.add
      local.get $8
      i32.lt_u
      i32.and
      if
       local.get $4
       i32.load16_u offset=2
       i32.const 64512
       i32.and
       i32.const 56320
       i32.eq
       if
        local.get $2
        i32.const 4
        i32.add
        local.set $2
        local.get $4
        i32.const 4
        i32.add
        local.set $4
        br $while-continue|00
       end
      end
      local.get $2
      i32.const 3
      i32.add
     end
    end
    local.set $2
    local.get $4
    i32.const 2
    i32.add
    local.set $4
    br $while-continue|00
   end
  end
  local.get $7
  local.get $2
  i32.store offset=4
  local.get $6
  call $~lib/@artela/aspect-libs/common/wraptypes/basic-types/AString#store
  local.set $4
  i32.const 0
  global.set $~argumentsLength
  call $~lib/@artela/aspect-libs/common/wraptypes/basic-types/AUint8Array#constructor@varargs
  local.tee $6
  local.get $3
  i32.store offset=4
  local.get $6
  i32.load
  local.get $3
  i32.load offset=8
  i32.store offset=4
  local.get $6
  i32.load
  i32.load offset=4
  i32.const 6
  i32.add
  call $~lib/rt/stub/__alloc
  local.tee $3
  local.get $6
  i32.load
  local.tee $2
  i32.load16_s
  i32.extend16_s
  i32.store16
  local.get $3
  local.get $2
  i32.load offset=4
  i32.store offset=2
  local.get $6
  i32.load
  drop
  local.get $3
  i32.const 6
  i32.add
  local.set $2
  loop $for-loop|00
   local.get $5
   local.get $6
   i32.load
   i32.load offset=4
   i32.lt_s
   if
    local.get $2
    local.get $6
    i32.load offset=4
    local.get $5
    call $~lib/typedarray/Uint8Array#__get
    i32.const 1
    call $~lib/memory/memory.fill
    local.get $2
    i32.const 1
    i32.add
    local.set $2
    local.get $5
    i32.const 1
    i32.add
    local.set $5
    br $for-loop|00
   end
  end
  local.get $4
  local.get $3
  call $~lib/@artela/aspect-libs/hostapi/aspect-state-api/__AspectStateApi__.set
  local.get $0
  i32.const 0
  i32.store8 offset=8
 )
 (func $~lib/as-proto/assembly/Reader/Reader#bytes@override (param $0 i32) (result i32)
  (local $1 i32)
  (local $2 i32)
  (local $3 i32)
  (local $4 i32)
  local.get $0
  i32.const 8
  i32.sub
  i32.load
  i32.const 10
  i32.eq
  if
   local.get $0
   call $~lib/as-proto/assembly/internal/FixedReader/FixedReader#varint32
   local.set $1
   i32.const 12
   i32.const 9
   call $~lib/rt/stub/__new
   local.get $1
   i32.const 0
   call $~lib/arraybuffer/ArrayBufferView#constructor
   local.tee $2
   i32.load offset=4
   local.set $3
   local.get $0
   local.get $0
   i32.load
   local.tee $4
   local.get $1
   i32.add
   i32.store
   local.get $0
   i32.load
   local.get $0
   i32.load offset=4
   i32.gt_u
   if
    i32.const 5232
    i32.const 5936
    i32.const 210
    i32.const 5
    call $~lib/builtins/abort
    unreachable
   end
   local.get $3
   local.get $4
   local.get $1
   call $~lib/memory/memory.copy
   local.get $2
   return
  end
  unreachable
 )
 (func $~lib/as-proto/assembly/Reader/Reader#skipType@override (param $0 i32) (param $1 i32)
  local.get $0
  i32.const 8
  i32.sub
  i32.load
  i32.const 10
  i32.eq
  if
   local.get $0
   local.get $1
   call $~lib/as-proto/assembly/internal/FixedReader/FixedReader#skipType
   return
  end
  unreachable
 )
 (func $~start
  (local $0 i32)
  global.get $~started
  if
   return
  end
  i32.const 1
  global.set $~started
  call $start:~lib/@artela/aspect-libs/types/aspect-entry
  i32.const 8
  i32.const 28
  call $~lib/rt/stub/__new
  local.tee $0
  i32.const 0
  i32.store
  local.get $0
  i32.const 0
  i32.store offset=4
  local.get $0
  global.set $~lib/@artela/aspect-libs/types/entrance/entryPoint
  i32.const 0
  i32.const 31
  call $~lib/rt/stub/__new
  local.tee $0
  if (result i32)
   local.get $0
  else
   i32.const 0
   i32.const 0
   call $~lib/rt/stub/__new
  end
  global.set $aspect/index/aspect
  global.get $~lib/@artela/aspect-libs/types/entrance/entryPoint
  global.get $aspect/index/aspect
  i32.store
 )
)

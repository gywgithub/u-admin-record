<template>
	<div class="release-success">
		<div class="succcess-main">
			<div class="mb20">
				<p class="sucmsg">提交成功，请耐心等待审核...</p>
			</div>
			<el-row>
				<el-button type="primary" round @click="hrefPath(1)"
					>我的经验</el-button
				>
				<el-button type="success" round @click="hrefPath(2)"
					>发布经验</el-button
				>
				<el-button type="info" round @click="hrefPath(3)"
					>寻求经验</el-button
				>
				<el-button type="warning" round @click="hrefPath(4)"
					>经验拓扑图</el-button
				>
			</el-row>
		</div>
	</div>
</template>

<script>
export default {
	name: "ReleaseSuccess",
	components: {},
	computed: {},
	watch: {},
	data() {
		return {
			pn: "经验成功",
			currShareData: {},
		};
	},
	mounted() {
		this.init();
	},
	methods: {
		init() {
			this.currShareData = JSON.parse(
				localStorage.getItem("tempShareObject")
			);
		},
		hrefPath(type) {
			if (type == 1) {
				this.$router.push("/experience/list");
			} else if (type == 2) {
				this.$router.push("/experience/release");
			} else if (type == 3) {
				this.$router.push("/experience/seek");
			} else if (type == 4) {
				this.$router.push("/topology");
			}
		},
	},
	destroyed() {
		localStorage.removeItem("tempShareObject");
	},
};
</script>

<style lang="scss" scoped>
.succcess-main {
	text-align: center;
	p.sucmsg {
		color: #42d885;
	}
	// display: flex;
	// justify-content: center; /* 水平居中 */
	// align-items: center; /* 垂直居中 */
}
</style>

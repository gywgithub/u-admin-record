<template>
	<div class="release-success">
		<div
			class="mainBody succcess-main"
			ref="mainRef"
			v-bind:style="{ minHeight: warpHeight + 'px' }"
		>
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
			warpHeight: "800px",
			currShareData: {},
		};
	},
	mounted() {
		this.init();
		this.$nextTick(() => {
			this.warpHeight = this.$b.dynamicWinHeight(90);
		});
	},
	methods: {
		init() {
			this.currShareData = JSON.parse(
				localStorage.getItem("experienceBaseInfo")
			);
		},
		hrefPath(type) {
			if (type == 1) {
				this.$router.push("/manage/releaseList");
			} else if (type == 2) {
				this.$router.push("/release/release");
			} else if (type == 3) {
				this.$router.push("/seek/seek");
			} else if (type == 4) {
				this.$router.push("/manage/trunk");
			}
		},
	},
	destroyed() {
		localStorage.removeItem("experienceBaseInfo");
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

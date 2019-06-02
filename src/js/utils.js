function str2md5(str){
    return this.$md5(""+salt.charAt(0)+salt.charAt(2) + str +salt.charAt(5) + salt.charAt(4));
}

export {str2md5}

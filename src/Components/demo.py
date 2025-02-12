class Solution(object):
    def merge(self, nums1, m, nums2, n):
        counter = 0
        l=[]

        while counter < m and counter < n :
            l.append(nums1[counter]) 
            l.append(nums2[counter]) 
            counter += 1
            
        


        while counter < m:
            l.append(nums1[counter])
            counter+=1

        while counter < n:
            l.append(nums2[counter])
            counter+=1

        return l
        

nums1 = [1,2,3,0,0,0]
m = 3
nums2 = [2,5,6]
n = 3
sol = Solution()
result = sol.merge(nums1, m, nums2, n)
print(result)